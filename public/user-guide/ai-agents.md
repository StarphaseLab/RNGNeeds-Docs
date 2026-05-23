# Agent Skill for RNGNeeds

> Source: https://docs.rngneeds.com/user-guide/ai-agents
> Description: How AI coding agents can learn RNGNeeds concepts, terminology, and patterns.

---
# Agent Skill for RNGNeeds

AI coding agents like Codex, Claude Code, and Cursor know Unity — but they do not know RNGNeeds. Ask one about weighted loot drops without any extra context and you will likely get a hand-rolled `Random.Range` solution that ignores the plugin entirely. The RNGNeeds agent skill fixes that. It is a small knowledge package you install once, and from that point on your agent understands the plugin’s features, terminology, and patterns well enough to give you answers that actually use them.

---

## The difference it makes

An agent skill works like a briefing document. You give it to the agent before the conversation starts, and the agent draws on it whenever your questions touch that topic. Think of it as the difference between asking a colleague who has never seen RNGNeeds and one who spent an afternoon reading the docs.

Here is a concrete example. Without the skill, you ask *“I need weighted loot drops for a chest”* and the agent writes a custom weighted-random function from scratch. With the skill installed, the same question gets you a `ProbabilityList<T>` setup with the correct API calls, inspector configuration tips, and a note about using repeat prevention or a depletable list if you need unique drops.

The skill does not make the agent perfect — it makes it informed. You should still review the code it gives you and test it in Unity, the same way you would with advice from any colleague.

---

## Install the skill

### ClawHub (for OpenClaw users)

The fastest option if you already use OpenClaw.

### skills.sh (for other agents)

If your coding agent supports the skills.sh ecosystem (Codex, Claude Code, Cursor, and others), install with:

```bash
npx skills add StarphaseLab/rngneeds-unity-skill --skill rngneeds-unity
```

---

## Getting good results

The skill gives the agent knowledge, but the quality of its answers still depends on what you ask. The single biggest improvement you can make is to describe your gameplay goal instead of asking for a specific API call.

For example, instead of *“how do I call PickValue?”*, try something like:

> *I am building a chest that drops three items when opened. Drops should never repeat within the same opening, and rare items should be less likely. What is the best way to set this up with RNGNeeds?*

That one prompt gives the agent enough to suggest the right feature, explain why, and write a working example. If you also mention your constraints — whether items should deplete permanently, whether probabilities need to shift at runtime, whether you are working in the Inspector or purely in code — the answer gets even more targeted.

Here are a few more prompts that tend to work well:

- *“I have grouped spawn tables for forest, cave, and ruins. Each biome has its own weighted enemy list. Should I use PLCollection for this?”*
- *“My PickValue() returns the default value sometimes and I do not understand why. Here is my setup — what should I check?”*
- *“I want enemy attack probabilities to shift as health drops. What RNGNeeds feature handles that, and can you show me a small example?”*
- *“I need a card draw system where drawn cards are removed from the pool until the deck is reshuffled. Is that a depletable list?”*

If the answer feels too generic or does not mention RNGNeeds features by name, that is usually a sign the skill did not load — double-check your installation.

---

## Always verify

Agents are useful, but they are not infallible. Make it a habit to review generated code before committing it, double-check API details against the official docs, and test probability behavior both in the editor and in play mode. If something feels off, ask a follow-up question — agents are good at correcting course when you point them at the specific part that looks wrong.

---

## Further reading

If the agent points you toward one of these features, the full guides go deeper:

- (see related page)
- (see related page)
- (see related page)
- (see related page)

Prefer human help? Visit our (see related page) page.

---
