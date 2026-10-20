import { isDragon, isWind } from "./tileUtils";

export function detectPinfu(handData) {
  const { melds, pair, closed, win } = handData;
  const { seatWind, roundWind } = win;

  // Rule 3: hand must be closed
  if (!closed) {
    return { han: 0, yaku: [] };
  }

  // Rule 1: all melds must be chi
  const allChi = melds.every(m => m.type === "chi");
  if (!allChi) {
    return { han: 0, yaku: [] };
  }

  // Safety check
  if (!pair || pair.length !== 2) {
    return { han: 0, yaku: [] };
  }

  const pairTile = pair[0];

  // Rule 2: pair must not be valued
  if (isDragon(pairTile)) {
    return { han: 0, yaku: [] };
  }

  if (isWind(pairTile)) {
    if (pairTile === seatWind || pairTile === roundWind) {
      return { han: 0, yaku: [] };
    }
  }

  return {
    han: 1,
    yaku: ["Pinfu (1 han)"]
  };
}
