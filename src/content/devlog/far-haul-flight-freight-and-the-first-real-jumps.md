---
title: 'Far Haul: Flight, Freight, and the First Real Jumps'
slug: far-haul-flight-freight-and-the-first-real-jumps
published: '2026-10-04'
draft: false
excerpt: 'Far Haul crossed an important line this week: the freight simulation, hands-on flight, local hauling, and interstellar jumps are starting to operate as one game.'
hero:
  src: /assets/projects/far-haul/farhaul.png
  alt: Far Haul artwork from the current project.
projects: [far-haul]
tags: [development, flight, economy, simulation]
seo:
  description: Far Haul now connects its freight economy to hands-on Newtonian flight, local hauling, FTL progression, and playable star jumps.
---

Far Haul has spent a lot of its early development as several big ideas being built in parallel: a physical ship builder, a freight economy, a large known-space setting, and the idea that flying the ship should matter. Over the last couple of days, those pieces started meeting each other.

The biggest change is that **taking the helm is becoming part of the freight game instead of a separate experiment**. The current flight model uses ship mass, thrust, specific impulse, fuel burn, turning limits, heat, power, hull damage, and docking constraints. A loaded ship does not behave like an empty one, and a trip is no longer just a button that advances the simulation.

Local freight now gives a new captain somewhere to start. The starter ship begins without an FTL drive, so early work happens inside a system: accepting local jobs, repositioning between sites, paying for fuel and berthing, and gradually building toward the first interstellar upgrade. Those local runs can be flown manually from undocking through cruise and the destination docking approach, with time compression available for the long middle of the trip.

That progression matters because the FTL drive is now an actual upgrade rather than something every ship simply has. Once a ship is equipped for interstellar work, the jump itself can be flown. The current sequence requires getting clear of the station, controlling speed and heat, then spooling the drive. Stars stretch into streaks, the field of view opens, the transition flashes through the simulation step, and the ship decelerates into the destination system. A new audio layer follows that same sequence with the spool, rush, engagement, and settling cues.

Underneath the cockpit work, the economy has been getting broader at the same time. Known space now has production and demand for the full freight-goods catalogue, carriers moving cargo through the network, crew costs, regional wage differences, frontier export chains, and difficulty calibration based on simulated operating margins. The intent is not to create a decorative market board. Freight should exist because places make things, other places need them, and somebody has to move them.

There is still a great deal missing from the Far Haul we ultimately want to build. Walking around ships, planetary exploration, EVA repair, deeper frontier discovery, and many of the physical-world systems remain future work. But the current web build now contains a recognizable loop: **find work, load the ship, fly it, pay the costs, improve the ship, and reach farther.**

That is a much more useful milestone than simply adding another feature. The pieces are beginning to behave like the same game.
