---
title: '911 Simulator: Version 1 Is Live'
slug: 911-simulator-version-1
published: '2026-10-07'
draft: false
excerpt: '911 Simulator has moved beyond its original training demo into a full playable first release, with dozens of calls, multi-call shifts, live units and incidents, player statistics, progression, challenges, and leaderboards.'
hero:
  src: /assets/projects/911-simulator/911sim.png
  alt: 911 Simulator artwork from the released game.
projects: [911-simulator]
tags: [release, simulation, dispatch, shift-mode]
seo:
  description: 911 Simulator Version 1 expands the original training demo into a full game with Play mode, multi-call shifts, live units, statistics, progression, challenges, and leaderboards.
---

The first public version of 911 Simulator started as a training demo: enough of the call-taking interface, map, units and scoring to prove that playing from the dispatcher's side of an emergency could work.

**Version 1 turns that demo into a full playable game.**

The most obvious change is simply that there is now a lot more to answer. The game has grown from its original training calls into a large library of Fire, Police, Traffic, Hazmat, Medical, Rescue, miscellaneous, prank and non-emergency situations. Calls can branch based on what the player asks, what the caller knows, how panicked they are and what has already happened in the conversation. Some callers return across multi-part story series, carrying the consequences of earlier calls forward.

For players who want to handle one incident at a time, **Play mode** pulls from that call library and scores the complete interaction. The job is not just identifying the emergency. The player has to get useful information from the caller, manage panic, confirm where help is needed and decide what resources actually belong on the call. Sending emergency units to something that does not need them can be a mistake too.

The larger addition is **Shift mode**.

Instead of finishing one call before the world resets, a shift keeps running. Calls ring into a queue. Several people may be waiting at once. Callers have limited patience and may hang up or call back. Answering a call creates an incident that continues after the phone conversation ends, so the player can be taking the next call while police, fire or EMS units are still driving to and working an earlier one.

Units are not interchangeable markers. Different unit types carry different capabilities, their locations matter, and they travel across a traced road network rather than teleporting between map points. Weather can slow them. Units remain busy while working and returning. Sending an outside agency can involve mutual aid, including an approval delay and a penalty when an unnecessary outside response was chosen over a suitable local unit.

Incidents can also get worse. Leave one without the resources it needs for too long and the situation can escalate, becoming harder and potentially producing a follow-up call. The end-of-shift report reconstructs that workload with a timeline, call and incident scores, mistakes, worsening incidents and an overall grade.

That is the core change in Version 1: **the player is managing a dispatch system now, not only answering a simulated telephone call.**

The game has grown around that loop with persistent statistics and progression. Calls and shifts feed player stats, XP, ranks and category mastery. Perfect shifts, harder difficulty settings and Daily Challenge streaks can unlock rewards. Daily Challenges use the same seeded conditions for everyone, while shift leaderboards track the different presets. Friends can be added by code for a friends-only leaderboard view.

Difficulty is selectable too. Relaxed, Standard and Hard modes change caller patience, clock pressure, starting panic and how much dispatch information the interface gives away. Hard mode deliberately removes some of the guidance that makes the correct response easier to identify.

The presentation has been expanded alongside the systems. Shift and Play modes have synthesized dispatch/radio/interface sounds, optional browser-generated caller voices, keyboard controls, screen-reader announcements and responsive mobile layouts. Shift results can also produce a shareable result card.

A lot of Version 1 work is less visible but just as important for calling it a release. Authentication and session handling were hardened, game results are validated and counted server-side, production data was separated from the repository, deployment and backup tooling was built, APIs received tighter validation and rate limiting, and anonymous play statistics can show where players struggle or leave the game while respecting Do Not Track and Global Privacy Control.

There is still plenty to add. More calls and story series can make Silver Lake County feel less predictable, and balance and presentation will continue to change as real players put time into the game.

But the milestone is different now.

The old question was whether the dispatch concept could become a game.

Version 1 is the first complete answer.
