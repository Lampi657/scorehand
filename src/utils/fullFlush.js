import { isHonor } from "./tileUtils";

export function detectChinitsu(handData) {
  const { melds, pair, closed } = handData;

  if (!pair || melds.length !== 4) {
    return { han: 0, yaku: [] };
  }

  let suit = null;

  const checkTile = tile => {
    if (isHonor(tile)) {
      return false;
    }

    const tileSuit = tile[1];

    if (!suit) {
      suit = tileSuit;
      return true;
    }

    return tileSuit === suit;
  };

  // Check melds
  for (const meld of melds) {
    for (const tile of meld.tiles) {
      if (!checkTile(tile)) {
        return { han: 0, yaku: [] };
      }
    }
  }

  // Check pair
  for (const tile of pair) {
    if (!checkTile(tile)) {
      return { han: 0, yaku: [] };
    }
  }

  return {
    han: closed ? 6 : 5,
    yaku: ["Full Flush (6/5 han)"]
  };
}
