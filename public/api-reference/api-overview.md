# API Overview

> Source: https://docs.rngneeds.com/api-reference/api-overview
> Description: Map of runtime types, extension points, and API entry points in RNGNeeds.

---
# API Overview

This page is the shortest path to understanding the shape of the RNGNeeds runtime API. If you are asking questions like *which type owns the real list state?*, *where do custom selection methods plug in?*, or *what should I read before extending the plugin?*, start here.

New to this section? Start with the Documentation Overview if you want the bigger picture first, then use this page as your quick map of the runtime types and extension points in the API.

The API Reference is the code-facing companion to the rest of the docs.

- **Documentation / Guides / Samples** teach workflows, use cases, and practical setups.
- **API Reference** explains what the runtime types actually do, what their members mean, and where the extension points live.

So yes: this section is intentionally more technical. The goal is to help you answer questions like **“Which type should I use?”**, **“What does this property actually control?”**, and **“Where do I register my custom selection method?”** without forcing you to reverse-engineer the package source first.

---

## API shape at a glance

Here is the API map in its simplest form: first the core runtime types you will most likely use directly, then the extension points you will reach for when you want to customize or extend RNGNeeds.

### Core runtime types

These are the main building blocks of day-to-day runtime usage — the types you will usually touch first when creating lists, working with items, organizing groups of lists, or inspecting recent picks.

<LinkGrid>
    <LinkCard href= title=(see related page)>
The main runtime type. Start here for creating lists, adding items, picking values, managing probabilities and weights, seeding, depletion, history, and repeat prevention.
    </LinkCard>
    <LinkCard href= title=(see related page)>
The per-item layer. Use this when you need to understand enabled vs locked items, influence, weights, units, depletion, and how an item's effective probability is evaluated.
    </LinkCard>
    <LinkCard href= title=(see related page)>
The collection layer for working with multiple named or indexed probability lists together. Great for grouped loot tables, dialogue pools, encounter sets, and similar systems.
    </LinkCard>
    <LinkCard href= title=(see related page)>
The history helper for recent picks. Useful when you want to inspect what was selected, support repeat-prevention logic, or work with recent pick results.
    </LinkCard>
</LinkGrid>

### Extension points

These pages are for advanced integration work — custom selection behavior, deterministic workflows, seed control, and the static registry that ties those systems together.

<LinkGrid>
    <LinkCard href= title=(see related page)>
The entry point for selection algorithms. Go here when you want to understand the built-in methods or create a custom one.
    </LinkCard>
    <LinkCard href= title=(see related page)>
The static integration hub for advanced users. Use it to register selection methods, inspect registered methods, work with seed providers, and understand fallback behavior.
    </LinkCard>
    <LinkCard href= title=(see related page)>
The extension point for deterministic workflows, reproducible tests, debugging, or custom seeding strategies.
    </LinkCard>
</LinkGrid>

---

## A few important concepts before you dive in

> **Note:**
    **Base probability** is not always the same as the final probability used during selection.
    <code>ProbabilityItem<T></code> stores a <code>BaseProbability</code>, but the evaluated <code>Probability</code> can change because of influence providers, spread settings, and other runtime state.

> **Note:**
    **Enabled** and **Locked** mean different things.
    Disabled items are ignored during selection. Locked items can still be selected, but their probability is protected from certain list operations such as normalization and redistribution.

> **Note:**
    **Curated docs and API docs do different jobs.**
    If you want tutorials, examples, and design advice, the curated sections are still the right destination — especially Documentation Overview, (see related page), (see related page), and (see related page).

---

## Reference pages in this section

<MemberGroup title="Core runtime types" tone="sky">
    <Member kind="CLASS" color="sky" name="ProbabilityList<T>">
The main list API for managing probability items and selecting values.
    </Member>
    <Member kind="CLASS" color="sky" name="ProbabilityItem<T>">
A single item in a probability list, including probability, state, influence, weight, and depletion data.
    </Member>
    <Member kind="CLASS" color="sky" name="PLCollection<T>">
A collection of multiple probability lists with helpers for lookup, picking, refilling, and clearing.
    </Member>
    <Member kind="CLASS" color="sky" name="PickHistory">
Stores recent picks and exposes helper methods for retrieving history entries or the latest picked indices.
    </Member>
</MemberGroup>

<MemberGroup title="Extension points" tone="amber">
    <Member kind="STATIC" color="violet" name="RNGNeedsCore">
Static registry and integration entry point for selection methods, seed providers, logging, and global helpers.
    </Member>
    <Member kind="INTERFACE" color="amber" name="ISelectionMethod">
The full custom path for implementing an entirely custom selection algorithm.
    </Member>
    <Member kind="BASE CLASS" color="amber" name="SelectionMethodBase">
Partial implementation for custom selection logic when you want help with prep, seeded randomness, depletion, and repeat-prevention plumbing.
    </Member>
    <Member kind="INTERFACE" color="amber" name="ISeedProvider">
The contract for generating seeds used by RNGNeeds.
    </Member>
</MemberGroup>

---

## Need examples, not just member descriptions?

Go to the curated sections when you want intent, workflow, and examples:

- Documentation Overview
- (see related page)
- (see related page)
- (see related page)

> **Note:**
    **Want to bounce an idea off us?**
    If you are extending RNGNeeds and want feedback on the shape of your API, your custom selection method, or your overall setup, feel free to drop by our (see related page) page and join the Discord from there.
