import { isTerminalOrHonor } from "./tileUtils";

export function detectHonroutou(handData) {
  const { melds, pair } = handData;

  if (!pair || melds.length !== 4) {
    return { han: 0, yaku: [] };
  }

  // Rule 1: no chi allowed
  const hasChi = melds.some(m => m.type === "chi");
  if (hasChi) {
    return { han: 0, yaku: [] };
  }

  // Rule 2: all tiles must be terminals or honors
  for (const meld of melds) {
    for (const tile of meld.tiles) {
      if (!isTerminalOrHonor(tile)) {
        return { han: 0, yaku: [] };
      }
    }
  }

  for (const tile of pair) {
    if (!isTerminalOrHonor(tile)) {
      return { han: 0, yaku: [] };
    }
  }

  return {
    han: 2,
    yaku: ["Terminals And Honors (2 han)"]
  };
}
