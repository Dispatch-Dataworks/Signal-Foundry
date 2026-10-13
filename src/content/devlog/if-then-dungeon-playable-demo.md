---
title: 'If Then Dungeon: From Rules on Paper to a Playable Demo'
slug: if-then-dungeon-playable-demo
published: '2026-10-12'
draft: false
excerpt: 'The logic-driven dungeon game is playable now, with heroes, card-built rules, monsters, and a full campaign. Early testing has also made one thing clear: learning to play is too hard.'
hero:
  src: /assets/projects/if-then-dungeon/1770051277561.png
  alt: Original If Then Dungeon concept artwork.
projects: [if-then-dungeon]
tags: [development, demo, learning, playtesting, balance]
seo:
  description: If Then Dungeon reaches a playable browser demo with rule cards, 24 levels, and animated character art, while early testers highlight onboarding and difficulty issues.
---

If Then Dungeon started as a question: could a dungeon adventure teach programming logic by making the player's instructions part of the game?

Now there is a playable answer. **The browser demo is live**, and the project has moved from design documents and JSON specifications into a functioning dungeon game.

## Program the hero, then watch the result

Players choose a hero, assemble IF / THEN / ELSE rule rows from Sensor, Action, and Operator cards, and roll to execute their instructions over a series of ticks. The goal is to reach the exit while managing enemies, hazards, and the consequences of unused cards. Those leftover cards generate **Pressure**, bringing more enemies into the dungeon.

The implementation includes a 24-level campaign across eight themes, multiple heroes and enemy types, traps, upgrades, persistent progress, and deterministic simulation. The same decisions can be retried and debugged instead of being obscured by a fresh random outcome.

## The dungeon is getting its own look

The recent art pass has been substantial. All twelve hero classes have animated card artwork, with alternate appearances in progress or added. Enemy cards have been receiving their own looping art, and trap tiles and theme scenes now help distinguish what is happening on the board. The repository tracks missing artwork explicitly, so placeholders are not mistaken for finished assets.

## The first real design problem: it is hard

The early playtest feedback is blunt: **the game is difficult to learn and difficult to play**. Some challenge belongs in a logic puzzle. Confusion about what a card means, what will happen when a rule executes, or why a run failed is a different problem.

Work has already started on a more approachable beginning: beginner-focused cards such as Turn to Open Path and Follow Right Wall, a **Test run** preview, and a calmer first level. A simulation bot runs campaign levels and records completion rates to help identify spikes in difficulty. Even so, simulation results cannot tell us whether a new player understands the interface or the instructions.

The next phase needs to emphasize teaching as much as content: clearer instructions, better feedback after a failed run, smoother introduction of mechanics, and tuning based on actual players rather than only automated success rates.

That is the point of releasing a demo early. It proves that the central idea works well enough to play—and reveals where the design needs to get out of the player's way.

**[Play If Then Dungeon](https://dispatch-dataworks.github.io/if-then-dungeon/)** — playable in a browser, still in active development.
