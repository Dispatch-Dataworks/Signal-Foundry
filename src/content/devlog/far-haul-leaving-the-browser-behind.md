---
title: 'Far Haul: Leaving the Browser Behind'
slug: far-haul-leaving-the-browser-behind
published: '2026-10-07'
draft: false
excerpt: 'Far Haul has retired its browser build so development can focus on a higher-quality Windows version—and the decision is already showing up in lighting, settings, surface exploration, ports, people, sound, and world identity.'
hero:
  src: /assets/projects/far-haul/farhaul.png
  alt: Far Haul artwork from the current project.
projects: [far-haul]
tags: [development, windows, quality, exploration, simulation]
seo:
  description: Far Haul retires its browser build to focus on a higher-quality Windows version, unlocking better presentation and a rapidly expanding physical game world.
---

One of the useful things about building a prototype is finding out which early assumptions are helping the game and which ones are starting to hold it back.

For Far Haul, the browser build had reached that point.

**Far Haul is now a desktop-only project, with development focused on the standalone Windows version.** The web export has been retired, and the project website now points players to the latest Windows build instead of launching the game in-browser.

That is a tradeoff. A browser build is convenient: click a link and play, with no installation step. It was especially useful while Far Haul was still proving that the ship builder, freight economy, flight model and first-person ship interior could belong to the same game.

But Far Haul is increasingly a game about being physically present in a large simulated world. Keeping the browser target meant continuing to design around constraints that were becoming less useful than the convenience they provided. The standalone build gives the project room to prioritize the experience itself.

The first visible result is presentation. Far Haul now uses Godot's Forward+ renderer on desktop, with Vulkan and an OpenGL fallback. Ships cast shadows on landing pads. Walls shade interiors. Pressurized compartments have their own lighting. Glass, moons and exterior scenes have been reworked around the desktop renderer rather than the old web target.

The move also came with a real settings screen: low, medium and high graphics quality, fullscreen, VSync, interface scaling, master/music/effects volume and mouse sensitivity. Those settings persist alongside the player's saves.

Startup changed just as dramatically. The economy's warm state is now precomputed and shipped with the game instead of being rebuilt when a new game starts. In the project's startup test, that took new-game startup from about **10.3 seconds to 0.09 seconds**. Moon terrain can also be prepared on a worker thread during cruise.

More important, the game world has expanded rapidly around that desktop focus.

Moon landing is now playable. Ships can fit lander legs and descend under gravity using lift jets, hover assistance or an autoland option. Landing too hard damages the hull. Once down, the player can leave through the airlock and walk on the surface. Surface freight pays differently, and taking off again is part of the trip rather than a menu transition.

The moons have also stopped being a single destination. Mining camps, abandoned outposts, ice mines and glass craters create places to fly, land and work. Terrain now includes boulders and slopes that affect both the suit and the ship. Samples, salvage, ice and crystals give exploration things to bring home instead of making the surface purely scenic.

The suit itself has become a system. Air is limited. Running consumes it faster. Better tanks, grip boots, a ground scanner and suit jets can be bought. Surface missions can ask the player to place survey beacons, reach a stranded surveyor or repair equipment against a clock. Deliveries to a camp can be unloaded by paying a crew—or by carrying the crates across the surface yourself.

Back in civilization, ports are becoming places rather than screens. Concourse areas, moon-base habs and camp huts are walkable, with physical desks for freight, fuel, repairs, shipbuilding, survey work and other services. Hull damage now persists until it is repaired, and fuel and repair prices depend on where the ship actually is.

The people standing in those places are starting to matter too. NPCs can offer rush freight, passenger work and sealed-cargo jobs outside the normal board. Completing work builds standing from Unknown through Known, Trusted and Respected, changing what people will trust the captain with and what they are willing to pay.

Sound received a similar pass: synthesized room tone, footsteps, engines, lift jets, suit breathing, low-air warnings, interface sounds and cargo impacts now reinforce where the player is and what the machinery is doing.

Most recently, the known-space locations have been getting identities of their own. Architecture, colors, crowds and props now vary by species, system tier and local role. Fuel depots, belt works and moon stations no longer reuse the same station dressed with a different name. Across the current data set, the automated identity checks now walk **108 places and 72 stations**.

None of that means the game is finished. Far Haul is still a prototype, and a lot of the frontier, exploration and ship-life ideas remain ahead.

But retiring the browser version clarifies what kind of prototype it is.

The goal is no longer to preserve the easiest possible way to launch Far Haul. The goal is to make the standalone version feel increasingly like the game Far Haul is supposed to become: a physical spacecraft, a working economy, places worth going, and enough detail that getting out of the pilot's seat matters.
