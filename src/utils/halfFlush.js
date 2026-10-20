import { isHonor } from "./tileUtils";

export function detectHonitsu(handData) {
  const { melds, pair, closed } = handData;

  if (!pair || melds.length !== 4) {
    return { han: 0, yaku: [] };
  }

  let suit = null;
  let hasHonor = false;

  const checkTile = tile => {
    if (isHonor(tile)) {
      hasHonor = true;
      return true;
    }

    const tileSuit = tile[1];

    if (!suit) {
      suit = tileSuit;
      return true;
    }

    return tileSuit === suit;
  };

  // Check meld tiles
  for (const meld of melds) {
    for (const tile of meld.tiles) {
      if (!checkTile(tile)) {
        return { han: 0, yaku: [] };
      }
    }
  }

  // Check pair tiles
  for (const tile of pair) {
    if (!checkTile(tile)) {
      return { han: 0, yaku: [] };
    }
  }

  if (!hasHonor) {
    return { han: 0, yaku: [] };
  }

  return {
    han: closed ? 3 : 2,
    yaku: ["Half Flush (3/2 han)"]
  };
}
