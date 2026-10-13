---
title: 'Far Haul 0.4–0.5: A Map and a Second Cockpit'
slug: far-haul-040-050-navigation-and-ship-remote
published: '2026-10-12'
draft: false
excerpt: 'The latest Windows prototypes add interactive system and trade-route maps, then put a live second cockpit on a phone or tablet over the local network.'
hero:
  src: /assets/projects/far-haul/farhaul.png
  alt: Far Haul project artwork.
projects: [far-haul]
tags: [development, windows, navigation, flight, simulation, release]
seo:
  description: Far Haul 0.4.0 adds system and known-space navigation maps; 0.5.0 adds optional phone and tablet Ship Remote instruments and helm controls.
---

Far Haul's last update made its planets and ports look like places worth visiting. Two releases later, the ship has better ways to understand where it is going—and an optional second cockpit screen that fits in your hand.

**Version 0.4.0 introduced interactive navigation maps. Version 0.5.0 added Ship Remote**, a local-network companion display and control surface for phones and tablets. The game remains a standalone Windows prototype.

## Version 0.4.0: finally, a map

Press **M** to open a chart while flying, walking aboard ship, wearing a suit or visiting a port. **Tab** switches between the local system and known space. Zoom, pan and recenter controls let the player inspect the route without leaving the game.

The **system chart** shows the star, named planets and moons, orbits, belts and local stations. A close-up helps untangle crowded destinations near the main world. During a freight run, the chart plots the route and the ship's progress, plus distance remaining, closing speed and estimated arrival in game time and real time at the current time-compression rate.

Two direction arrows tell a useful story: where the ship is actually moving and where its nose is pointed. In a momentum-based flight model, those can be very different things.

The **known-space chart** shows all eighteen established systems and their trade-route connections, with heavier routes drawn more prominently. It identifies the current system and marks a destination during a jump.

The map is an intentionally compressed navigation diagram, not a scale-accurate model of orbital distances. And the ship keeps flying while the chart is open.

## Version 0.5.0: Ship Remote

The next update turns a phone or tablet into an optional companion to the Windows cockpit. **Ship Remote** is a small web server built into the game. It is **off by default** and, when enabled, serves a browser-based interface to devices on the same local network.

The remote displays:

- Flight progress and estimated arrival in real time
- Local-system and known-space charts
- Speed, fuel, heat, hull condition and available delta-v
- A helm with throttle, cut, brake, course hold, assist and time-compression controls
- Docking, traffic-control and tug actions when the current game state permits them

The interface adapts to screen size: phones use a single-column layout, while tablets can place the map beside gauges and controls.

Remote commands use the same pilot-command path as the keyboard, so they follow the game's existing flight rules and restrictions. This is not a separate flight simulation running in the browser; the Windows game remains authoritative.

## Pairing and control

Ship Remote is enabled in **Settings → Ship remote**. The **F10** menu shows the local address and a six-digit pairing code. Five incorrect code attempts temporarily lock out an address for one minute. Generating a new code disconnects existing paired devices.

The feature is intended for trusted local networks, not for exposure to the public internet. The normal Windows game does not require the remote server to be enabled.

## The broader picture

Together, these releases improve two different parts of the freight experience. The maps help explain distance, direction and the relationships between destinations. Ship Remote lets a second screen stay focused on instruments and commands while the main display shows the ship and the world outside.

Far Haul remains a work in progress. Atmospheric worlds, EVA spacewalks and crew systems are not yet implemented, and economy values and tuning may change.

Read the [v0.4.0 release notes](https://github.com/benjaminarthurt/FarHaul/releases/tag/v0.4.0) and [v0.5.0 source and release history](https://github.com/benjaminarthurt/FarHaul/releases). The [previous v0.3.0 devlog](/devlog/far-haul-030-known-space/) remains available.
