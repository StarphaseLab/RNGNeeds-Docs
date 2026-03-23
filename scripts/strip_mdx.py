#!/usr/bin/env python3
"""Strip MDX/JSX syntax from .mdx files, producing clean markdown for LLM ingestion."""

import re
import sys


def strip_mdx(text: str) -> str:
    # Remove import blocks (single and multi-line)
    # Multi-line: import ... from '...'
    text = re.sub(
        r"^import\s+[\s\S]*?from\s+['\"].*?['\"];?\s*$",
        "", text, flags=re.MULTILINE
    )
    # Single-line imports without from
    text = re.sub(r"^import\s+['\"].*?['\"];?\s*$", "", text, flags=re.MULTILINE)

    # Remove export const/default lines
    text = re.sub(r"^export\s+const\s+.*$", "", text, flags=re.MULTILINE)
    text = re.sub(r"^export\s+default\s+.*$", "", text, flags=re.MULTILINE)

    # Remove standalone string literals (leftover from multi-line export const description)
    text = re.sub(r"^\s+['\"].*?['\"];?\s*$", "", text, flags=re.MULTILINE)

    # Remove JSX self-closing tags (HeroPattern, Image, ImageX, Button, etc.)
    text = re.sub(r"<[A-Z]\w*\s+[^>]*/\s*>", "", text)
    text = re.sub(r"<[A-Z]\w*\s*/>", "", text)

    # Remove Button components with children
    text = re.sub(r"<Button\b[^>]*>[^<]*</Button>", "", text)

    # Remove ImageX components
    text = re.sub(r"<ImageX\b[^>]*/>", "", text)

    # Remove <div ...> and </div> with JSX attributes
    text = re.sub(r"<div\b[^>]*>", "", text)
    text = re.sub(r"</div>", "", text)

    # Convert <Note> to blockquote markers
    text = re.sub(r"<Note>", "> **Note:**", text)
    text = re.sub(r"</Note>", "", text)

    # Remove Row/Col/Properties/CodeGroup wrappers
    for tag in ["Row", "Col", "Properties", "CodeGroup"]:
        text = re.sub(rf"<{tag}[^>]*>", "", text)
        text = re.sub(rf"</{tag}>", "", text)

    # Convert <Property name="x" type="y"> content </Property> to markdown
    def convert_property(m):
        name = m.group(1)
        ptype = m.group(3) or ""
        content = re.sub(r"</?p>", "", m.group(4)).strip()
        if ptype:
            return f"- **{name}** (`{ptype}`): {content}"
        return f"- **{name}**: {content}"

    text = re.sub(
        r'<Property\s+name="([^"]*)"(\s+type="([^"]*)")?\s*>(.*?)</Property>',
        convert_property, text, flags=re.DOTALL
    )

    # Convert JSX links to plain text
    text = re.sub(r"<a\s+href=\{[^}]*\}>([^<]*)</a>", r"\1", text)

    # Replace {VarName.Title} references
    text = re.sub(r"\{\w+\.Title\}", "(see related page)", text)
    text = re.sub(r"\{\w+\.Link\}", "", text)

    # Remove remaining JSX expression constants like {ASSET_STORE_RNGNEEDS_LINK}
    text = re.sub(r"\{[A-Z][A-Z_]*\}", "", text)

    # Remove {{ className: ... }} expressions
    text = re.sub(r"\{\{[^}]*\}\}", "", text)

    # Strip <p>, </p>, <strong>, </strong> tags (convert strong to markdown bold)
    text = re.sub(r"</?p>", "", text)
    text = re.sub(r"<strong>", "**", text)
    text = re.sub(r"</strong>", "**", text)

    # Convert HTML entities
    text = text.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&")

    # Remove lines that are only whitespace
    text = re.sub(r"^\s+$", "", text, flags=re.MULTILINE)

    # Dedent lines that were inside Col/Row blocks (leading 8-space indent)
    text = re.sub(r"^        ", "", text, flags=re.MULTILINE)

    # Collapse 3+ consecutive blank lines to 2
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Strip leading blank lines
    text = text.lstrip("\n")

    return text


if __name__ == "__main__":
    sys.stdout.write(strip_mdx(sys.stdin.read()))
