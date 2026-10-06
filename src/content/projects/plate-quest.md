---
title: Plate Quest
slug: plate-quest
excerpt: An offline-first family road-trip game for collecting license plates, tracking where they came from, and scoring the distance traveled.
collection: games
status: Playable Demo
developmentState: Active Development
order: 4
bench: true
tags: [road-trip, family, offline, browser]
genres: [Family game, Collection game]
platforms: [Browser, PWA]
audience: Families and preteen players; designed for passenger use during road trips.
developer: Signal Foundry Games
technologies: [HTML, CSS, JavaScript, PWA]
hero:
  src: /assets/projects/plate-quest/cover.svg
  alt: Plate Quest project artwork inspired by the game's dark road-trip interface, license plates, and collection statistics.
card:
  src: /assets/projects/plate-quest/cover.svg
  alt: Plate Quest project artwork with a license plate and road-trip collection statistics.
actions:
  - label: Play Now
    url: https://benjaminarthurt.github.io/plate-quest/
    kind: play
    priority: 0
  - label: View source on GitHub
    url: https://github.com/benjaminarthurt/plate-quest
    kind: github
    priority: 20
milestones:
  - category: Completed
    title: Playable offline-first road-trip loop
    description: Start a trip, locate the device, collect jurisdictions, score sightings, review the collection, and export local data.
  - category: Completed
    title: Boundary-based scoring and sighting undo
    description: Sightings use distance from the issuing jurisdiction boundary for scoring, with an undo path for mistakes.
  - category: Current
    title: Preparing the Version 1 release
    description: Current work is focused on backup restore, production assets, trip summaries and history, testing, accessibility, privacy copy, and release engineering.
  - category: Someday / Exploring
    title: Post-1.0 expansion
    description: Achievements, competitive modes, cloud sync, shared live trips, broader plate artwork, and online statistics remain possible future directions.
requirements:
  minimum:
    input: Touch or mouse; intended for passenger use while traveling.
    network: Internet is needed for the initial load. The application shell and bundled assets are designed for offline play after caching.
    notes: Location permission improves automatic jurisdiction and distance scoring; the game can also use a manually selected jurisdiction.
seo:
  description: Plate Quest is an offline-first family road-trip license plate collection game with local saves, geolocation, scoring, and a playable browser build.
  image: /assets/projects/plate-quest/cover.svg
---

## Overview

Plate Quest turns the familiar road-trip license plate game into a local-first browser game. Start a trip, let the device follow your location, and collect issuing jurisdictions as your team spots them. Each jurisdiction can be collected once per trip, with the game tracking plates, estimated distance, points, and completion.

The current build includes a North America collection map, searchable plate picker, U.S. plate artwork, automatic location updates during active trips, boundary-based distance scoring, sighting undo, local trip storage, offline caching, and JSON export. It runs entirely in the browser without accounts, a backend API, or a database.

## Why We Made This

Plate Quest grew out of the kind of game families already play in the car. The goal was not to replace that simple game with a complicated system; it was to make keeping score, recognizing plates, and seeing how far a find traveled more interesting without requiring an account or constant connection.

That also made it a good fit for Signal Foundry: a small game built because we wanted it for ourselves, designed around a real situation where offline support and straightforward mobile controls matter.

## What Makes It Different

Distance is part of the game. Rather than treating every plate as identical, Plate Quest estimates how far the sighting is from the nearest boundary of its issuing jurisdiction and turns that distance into a balanced point score. A plate from nearby still counts; a genuinely far-traveled plate becomes a more valuable find.

The game is deliberately local-first. Trip and location data stay on the device unless the player exports them, and the application does not need user accounts or a server-side database.

Plate Quest is also explicitly passenger-first. The interface includes a road-trip safety reminder: the driver should keep their eyes on the road while a passenger handles the game.
