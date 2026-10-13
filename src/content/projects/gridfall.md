---
title: Gridfall
slug: gridfall
excerpt: Keep the lights on. Decide who goes dark. A planned infrastructure strategy game about operating an aging regional electrical grid under pressure.
collection: workshop
status: Concept
developmentState: Active Development
order: 5
tags: [simulation, strategy, infrastructure, decision-making]
genres: [Infrastructure simulation, Systems strategy]
platforms: [Windows (planned)]
developer: Signal Foundry Games
engine: Godot 4 (proposed)
actions:
  - label: View Project Repository
    url: https://github.com/Dispatch-Dataworks/GridFall
    kind: github
    priority: 0
milestones:
  - category: Completed
    title: Initial game design documented
    description: Core gameplay, campaign structure, scenario framework, technical direction, and prototype scope are documented in the project repository.
  - category: Current
    title: Prototype planning
    description: Define and test a deterministic network simulation with two generators, three substations, four districts, switching, demand changes, and faults.
  - category: Planned
    title: First playable incident
    description: Build a pausable schematic interface with an equipment inspector, actionable warnings, fault recovery, and an end-of-shift report.
  - category: Someday / Exploring
    title: Campaign and sandbox
    description: Explore an eight-chapter campaign, standalone scenarios, and configurable grid operation after validating the core gameplay.
seo:
  description: Gridfall is a planned electrical-grid infrastructure strategy game by Signal Foundry Games. Operate a fictional regional grid, manage failures, and decide who gets power.
---

## Overview

**Keep the lights on. Decide who goes dark.**

Gridfall is a planned single-player infrastructure strategy game about managing a fictional regional electrical grid. Balance power generation against changing demand, isolate faults, reroute electricity through limited infrastructure, and make difficult choices when there is not enough capacity to serve everyone.

The player runs the aging **North Valley Regional Power Authority**, responsible for towns, industry, and critical services. An ordinary shift can turn into a crisis when a transformer overheats, a storm damages a line, or demand exceeds supply.

## What Makes It Different

Gridfall is about understanding how systems interact. Starting reserve generation may solve a shortage but not an overloaded transmission path. Rerouting power may protect a hospital while pushing another transformer toward failure. Deliberate load shedding can prevent a much larger blackout, but it carries real consequences within the game.

The planned core loop is **monitor, diagnose, act, simulate, and assess**. The game is intended to be pausable rather than reflex-driven, with clear explanations for warnings and failures.

## Planned Experience

The design calls for a story-driven campaign about an aging utility, self-contained emergency scenarios, and an eventual sandbox. A 2D schematic network is the proposed main interface, with Godot 4 as the initial engine choice.

The first prototype will focus on just two generators, three substations, four demand districts, and a small number of failures. That will test whether grid operations make for understandable and interesting gameplay before expanding the scope.

**Gridfall is currently a concept, not a playable game.** The design and technical plans are available in the [Gridfall GitHub repository](https://github.com/Dispatch-Dataworks/GridFall). The electrical simulation will be intentionally fictional and simplified, not a real-world utility operations tool.
