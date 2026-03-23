#!/usr/bin/env bash
# Build llms-full.txt from MDX source files.
# Uses strip_mdx.py to clean JSX/MDX syntax into plain markdown.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$REPO_ROOT/src/pages"
OUT="$REPO_ROOT/public/llms-full.txt"
STRIP="$REPO_ROOT/scripts/strip_mdx.py"

# Ordered list of pages (logical reading order)
PAGES=(
  # User Guide
  "user-guide/introduction.mdx"
  "user-guide/getting-started.mdx"
  "user-guide/user-interface.mdx"
  "user-guide/preferences.mdx"
  "user-guide/faq.mdx"
  "user-guide/support.mdx"

  # Documentation
  "documentation/docs-overview.mdx"
  "documentation/terminology.mdx"
  "documentation/designing-a-list.mdx"
  "documentation/selecting-values.mdx"
  "documentation/depletable-lists.mdx"
  "documentation/repeat-prevention.mdx"
  "documentation/probability-influence.mdx"
  "documentation/testing-outcomes.mdx"
  "documentation/seeding-options.mdx"
  "documentation/pick-history.mdx"
  "documentation/nesting-lists.mdx"
  "documentation/customizing-lists.mdx"
  "documentation/change-log.mdx"

  # Samples
  "samples/samples-overview.mdx"
  "samples/dice-playground.mdx"
  "samples/random-audio.mdx"
  "samples/monster-spawner.mdx"
  "samples/basic-samples.mdx"
  "samples/intermediate-samples.mdx"
  "samples/advanced-samples.mdx"
  "samples/influence-deep-dive.mdx"
  "samples/treasure-chest.mdx"

  # Guides
  "guides/guides-overview.mdx"
  "guides/guide-selecting-distinct-values.mdx"
  "guides/guide-probability-influence.mdx"
  "guides/guide-plcollection.mdx"
  "guides/guide-depletable-list-examples.mdx"

  # API Reference
  "api-reference/api-overview.mdx"
  "api-reference/rngneeds.mdx"
  "api-reference/probability-list.mdx"
  "api-reference/probability-item.mdx"
  "api-reference/pick-history.mdx"
  "api-reference/selection-methods.mdx"
  "api-reference/seed-provider.mdx"
  "api-reference/pl-collection.mdx"
)

{
  cat <<'HEADER'
# RNGNeeds — Complete Documentation

> RNGNeeds is a probability distribution plugin for Unity. It lets developers design and manage
> weighted probability lists for any type directly in the Unity Inspector, with a full C# API
> for runtime control.
>
> Website: https://www.rngneeds.com
> Documentation: https://docs.rngneeds.com
> Asset Store: https://assetstore.unity.com/packages/tools/utilities/rngneeds-probability-distribution-247024
> Discord: https://discord.gg/EghN9gFHmw

---

HEADER

  for page in "${PAGES[@]}"; do
    filepath="$SRC/$page"
    if [[ ! -f "$filepath" ]]; then
      echo "# [MISSING: $page]"
      echo
      continue
    fi

    url_path="${page%.mdx}"
    echo "---"
    echo
    echo "Source: https://docs.rngneeds.com/$url_path"
    echo
    python3 "$STRIP" < "$filepath"
    echo
  done
} > "$OUT"

size=$(wc -c < "$OUT")
lines=$(wc -l < "$OUT")
echo "Built $OUT — $lines lines, $size bytes"
