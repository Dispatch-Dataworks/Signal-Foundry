---
title: 'Far Haul: Flight, Freight, and the First Real Jumps'
slug: far-haul-flight-freight-and-the-first-real-jumps
published: '2026-10-04'
draft: false
excerpt: 'Far Haul now connects freight, hands-on flight, star jumps, and first-person movement through the ship—and has gained a portable Windows build alongside the browser demo.'
hero:
  src: /assets/projects/far-haul/farhaul.png
  alt: Far Haul artwork from the current project.
projects: [far-haul]
tags: [development, flight, economy, simulation, first-person]
seo:
  description: Far Haul now connects freight, Newtonian flight, FTL jumps, first-person ship interiors, and a portable Windows build.
---

Far Haul has spent a lot of its early development as several big ideas being built in parallel: a physical ship builder, a freight economy, a large known-space setting, and the idea that flying the ship should matter. Over the last couple of days, those pieces started meeting each other.

The biggest change is that **taking the helm is becoming part of the freight game instead of a separate experiment**. The current flight model uses ship mass, thrust, specific impulse, fuel burn, turning limits, heat, power, hull damage, and docking constraints. A loaded ship does not behave like an empty one, and a trip is no longer just a button that advances the simulation.

Local freight now gives a new captain somewhere to start. The starter ship begins without an FTL drive, so early work happens inside a system: accepting local jobs, repositioning between sites, paying for fuel and berthing, and gradually building toward the first interstellar upgrade. Those local runs can be flown manually from undocking through cruise and the destination docking approach, with time compression available for the long middle of the trip.

That progression matters because the FTL drive is now an actual upgrade rather than something every ship simply has. Once a ship is equipped for interstellar work, the jump itself can be flown. The current sequence requires getting clear of the station, controlling speed and heat, then spooling the drive. Stars stretch into streaks, the field of view opens, the transition flashes through the simulation step, and the ship decelerates into the destination system. A new audio layer follows that same sequence with the spool, rush, engagement, and settling cues.

Underneath the cockpit work, the economy has been getting broader at the same time. Known space now has production and demand for the full freight-goods catalogue, carriers moving cargo through the network, crew costs, regional wage differences, frontier export chains, and difficulty calibration based on simulated operating margins. The intent is not to create a decorative market board. Freight should exist because places make things, other places need them, and somebody has to move them.

The next major step arrived quickly: **you can now get out of the pilot's seat and walk through the ship in first person**. From the helm, the player can stand up and move through the rooms while the ship continues on the course and throttle it was left with. The walking system derives walls, doorways, ladders, furniture, loaded containers, ceilings, and the airlock from the built ship rather than treating the interior as a separate decorative level. At a berth, the airlock can also be used to leave the ship.

That changes an important sentence in the project's long-term description. Walkable ships are no longer only a design direction; the first implementation is in the playable build. Planetary exploration, EVA repair, deeper frontier discovery, and many of the physical-world systems are still future work.

The presentation and distribution side moved forward as well. A new 40-second intro video now carries its own music before the theme fades in on the title screen. Far Haul also has a portable Windows export: the game is packed into a single executable, with saves kept in a **Far Haul saves** folder beside it when the location is writable. Tagged releases can now automatically build that Windows version and publish it as a GitHub Release. The browser build remains available, but it is no longer the only practical way to package the prototype.

There has been less glamorous work too, including a dock layout fix that keeps the freight contract board and empty-flight list visible and scrollable on shorter windows. That kind of change matters because the simulation only works as a game if the player can actually reach the controls and information the underlying systems expose.

The current build now contains a much more recognizable loop: **find work, load the ship, fly it, get up and move through the ship, pay the costs, improve the ship, and reach farther.**

That is a more meaningful milestone than simply adding another feature. The pieces are increasingly behaving like the same game.
