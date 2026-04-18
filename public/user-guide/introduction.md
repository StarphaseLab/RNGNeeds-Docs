# Introduction

> Source: https://docs.rngneeds.com/user-guide/introduction
> Description: High-level overview of RNGNeeds and where it fits best in Unity workflows.

---
# Introduction

RNGNeeds is a Unity plugin for weighted randomness, probability-driven gameplay systems, and inspector-friendly probability lists. Use it when you want loot tables, enemy spawns, dialogue picks, card draws, dice systems, or any other random selection workflow to be easier to design, easier to debug, and more flexible than hand-rolled `Random.Range` logic. 

In practice, RNGNeeds sits in the space between simple weighted-random snippets and fully custom probability frameworks. It is especially useful when you want both a strong Unity Inspector workflow for designers and a capable C# API for runtime control.

    <AssetStoreLink as={Button} arrow="right">Get the Plugin from Asset Store</AssetStoreLink>

---

## Preface
Every game thrives on an element of surprise, that tantalizing unpredictability that hooks players in. But managing this randomness, these 'RNG needs', is often more art than science. With RNGNeeds, you have a Unity plugin that redefines randomness, transforming it from a wild variable into a finely-tuned instrument of creativity.

Beyond the dice rolls and item drops, RNGNeeds offers you a canvas of opportunity. Imagine dynamically adjusting the frequency of in-game storms as your player progresses through the storyline, modulating NPC behavior based on time of day, or making the battle more intense if the music volume is loud.

RNGNeeds puts you in the director's seat, allowing you to craft unique, immersive experiences that respond and adapt to your game world. Because RNG isn't just about luck - it's about creating living, breathing worlds where anything is possible.        

## What is RNGNeeds?
RNGNeeds is a powerful plugin that enables you to design and manage probability lists for any value, type, or custom object directly within the Unity Inspector. With this plugin, you can take control of your dice rolls, monster spawns, card decks, item drops, damage modifiers, or even organic animations using probability distribution with unparalleled simplicity and ease-of-use. Whether you want to design your lists, variable pick counts, and seeding right in the inspector, or harness the powerful API to control everything from code, RNGNeeds has you covered.

### Why use it instead of hand-rolled weighted random code?
Because most weighted-random systems become messy as soon as they need to do more than a single pick from a hard-coded table.

RNGNeeds gives you a reusable structure for:
- designer-friendly probability editing in the Inspector
- multiple selection methods
- repeat prevention
- depletable lists
- seed control and deterministic workflows
- probability influence from runtime conditions
- reusable grouped list setups such as PLCollection

If your needs are tiny, a custom snippet may be enough. If your randomness system needs to grow with the project, RNGNeeds is usually the more maintainable option.

With RNGNeeds, you're not just getting a powerful tool, but also a user-friendly and adaptable solution. It's designed to cater to both coders and designers, with all features accessible via the Inspector and an easy-to-use API. The plugin supports all LTS versions of Unity and offers a range of powerful features. You can pick multiple items at once using various probability methods, including pure random selection. It also offers an easy way to retain a preferred seed, set a custom one, or implement your own Seed Provider. Furthermore, you can easily implement and register your custom Selection Methods or seeding options.

RNGNeeds also helps to make your workflow more efficient and adaptable. It enables you to design Influence Providers to dynamically modify probabilities based on external factors. You can choose a fixed pick count, or select a random range with an adjustable curve to control bias. Furthermore, you can avoid consecutive item selections with multiple repeat prevention techniques and track previous item picks for each list separately, employing history to mimic deterministic probability behavior.

Our commitment to you extends beyond the current version of RNGNeeds. We're excited to share that we have a range of new features on the roadmap that we're actively working on. These include dynamic modification of probabilities, card deck extensions, and the ability to assign units to items in the list and allow picks to deplete them, among others.

Thank you once again for choosing RNGNeeds. We're excited to see the amazing creations you'll bring to life with our plugin. Your trust in us fuels our passion to continue developing and refining RNGNeeds, to ensure it remains - probably - the best solution for all your random needs!

---
