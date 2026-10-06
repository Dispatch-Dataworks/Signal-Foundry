---
title: 'Plate Quest: Turning the License Plate Game into a Road-Trip App'
slug: plate-quest-road-trip-game
published: '2026-07-16'
draft: false
excerpt: Plate Quest took the familiar family license plate game and turned it into an offline-first browser experience with location-aware scoring, plate artwork, and continuous trip tracking.
hero:
  src: /assets/projects/plate-quest/cover.svg
  alt: Plate Quest project artwork inspired by the game's road-trip interface and license plate collection.
projects: [plate-quest]
tags: [development, road-trip, family, browser]
seo:
  description: Plate Quest became a playable offline-first road-trip game with local trip data, geolocation, boundary scoring, plate artwork, undo, and continuous location tracking.
---

The license plate game does not need much explanation. On a long drive, somebody spots a plate from another state, everybody starts looking, and eventually somebody tries to remember which ones have already been counted.

Plate Quest started from the idea that a phone could handle that bookkeeping without turning the game into something that needed accounts, a server, or a reliable connection on the highway.

The first version was built as a static, mobile-first browser application. Trips and sightings stay on the device, the application shell can be cached for offline use, and the collection is organized around states, provinces, territories, and other supported jurisdictions. A North America map and searchable plate picker give passengers more than one way to record a find.

Location became part of the scoring rather than just a convenience. The game can follow the device during an active trip and use the sighting position to estimate distance from the issuing jurisdiction. The scoring model uses the nearest jurisdiction boundary instead of a simple center point, so a plate found just across a state line is treated differently from one that has genuinely traveled across the continent.

The visual side also moved beyond text labels. Plate artwork was added to help players recognize standard U.S. designs, with support for choosing a dominant design while preserving alternates. Those assets are cached for offline play along with the rest of the game.

A few practical family-game details arrived with that work: welcome instructions, a prominent reminder that a passenger—not the driver—should operate the game, a collection log, and an undo path when somebody taps the wrong plate.

By July 16, continuous location tracking had been added for active trips and the project had a formal Version 1 launch checklist. Plate Quest was no longer just a road-trip idea. It had the core loop we wanted: **start a trip, spot a plate, collect it, see how far it traveled, and keep hunting.**

There is still release work to do. Backup restore, trip summaries and history, production-asset hardening, broader testing, accessibility checks, and release documentation remain on the Version 1 list. Features such as achievements, competitive player modes, cloud synchronization, shared live trips, and online leaderboards are explicitly post-1.0 possibilities rather than promises about the current build.
