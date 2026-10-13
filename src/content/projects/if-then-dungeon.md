---
title: If Then Dungeon
slug: if-then-dungeon
excerpt: A playable browser dungeon adventure where players program heroes using IF/THEN rule cards. Early tests show the learning curve still needs work.
collection: games
status: Playable Demo
order: 4
tags: [learning, programming, decision-making]
genres: [Educational, Dungeon adventure]
audience: Intended for roughly ages 10–15; an informal design target, not a formal age rating.
developer: Signal Foundry Games
hero:
  src: /assets/projects/if-then-dungeon/1770051277561.png
  alt: Original If Then Dungeon concept artwork; this is concept art, not a game screenshot.
card:
  src: /assets/projects/if-then-dungeon/1770051277561.png
  alt: Original concept artwork for If Then Dungeon.
gallery:
  - src: /assets/projects/if-then-dungeon/1770051277561.png
    alt: Original concept artwork created for If Then Dungeon.
    caption: Early visual development for the If Then Dungeon concept.
    type: concept
    order: 0
  - src: /assets/projects/if-then-dungeon/1770051362666.png
    alt: Additional original concept artwork created for If Then Dungeon.
    caption: Additional visual exploration from the project's concept phase.
    type: concept
    order: 1
  - src: /assets/projects/if-then-dungeon/1770051511110.png
    alt: Additional original concept artwork created for If Then Dungeon.
    caption: Additional visual exploration from the project's concept phase.
    type: concept
    order: 2
actions:
  - label: Play Demo
    url: https://dispatch-dataworks.github.io/if-then-dungeon/
    kind: play
    priority: 0
  - label: View source on GitHub
    url: https://github.com/Dispatch-Dataworks/if-then-dungeon
    kind: github
milestones:
  - category: Completed
    title: Playable browser demo
    description: Rule-card programming, deterministic dungeon turns, heroes, enemies, traps, Pressure, and a multi-level campaign are implemented.
  - category: Current
    title: Improve onboarding and difficulty
    description: Early testers find the game hard; teaching, pacing, instructions, and balance need further work.
  - category: Completed
    title: Card-built rule rows in a logic-first grid dungeon
    description: Program the hero using Sensors, Actions, and Operators, with IF/THEN/ELSE and Boolean logic. Build playable IF/THEN/ELSE rows using Sensors, Actions, and Operators.
  - category: Completed
    title: Tick-based learning and debugging loops
    description: Explore loops, operator precedence, edge cases, and deterministic retries through monsters, hazards, and upgrades.
  - category: Completed
    title: Pressure from unused cards
    description: Unused cards create Pressure and spawn enemies, making hand management part of each turn.
  - category: Current
    title: Campaign, visual art, and replayability
    description: A 24-level campaign across eight themes is implemented, while artwork and balance continue to evolve.
seo:
  description: Play the If Then Dungeon browser demo, a programming-inspired dungeon adventure with rule cards, heroes, monsters, and puzzles.
  image: /assets/projects/if-then-dungeon/cover.png
---

## Overview

If Then Dungeon is now a **playable browser demo**. Players program a hero by building IF / THEN / ELSE rule rows from Sensor, Action, and Operator cards, then roll and watch those rules play out on a dungeon grid.

The prototype has progressed well beyond the original concept: a 24-level campaign across eight themes, multiple heroes and enemies, traps, obstacles, upgrades, deterministic retries, and the Pressure system are implemented. Artwork is also progressing, including animated character cards and alternate hero appearances.

## Learning Through Play

The idea is still to make Boolean logic, debugging, and edge cases feel like part of a dungeon adventure rather than a separate lesson. Each turn offers card exchanges and rule-building choices. Unused cards add Pressure, which can spawn additional enemies. When a plan fails, the player can inspect what happened and adjust the rules.

## The Hard Part Is Making It Learnable

**Early testers report that the game is difficult.** That is important feedback, particularly for a game intended to introduce programming ideas to younger players. The team has already added beginner-oriented cards, a Test run preview, and a calmer opening level, but the instructions, learning curve, and balance need more work. A simulation bot and balance reports help identify trouble spots; they are not substitutes for watching real players learn.

The intended audience remains roughly ages 10–15, an informal design target rather than a formal age rating. The game is playable now, but it is still an early demo undergoing tuning.

**[Play the If Then Dungeon demo](https://dispatch-dataworks.github.io/if-then-dungeon/)**

The images shown here are concept artwork, not screenshots of the current build.
