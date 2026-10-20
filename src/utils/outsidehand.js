import { isTerminal, isHonor } from "./tileUtils";

export function detectJunchan(handData) {
  const { melds, pair, closed } = handData;

  if (!pair || melds.length !== 4) {
    return { han: 0, yaku: [] };
  }

  // Rule 3: no honors
  for (const meld of melds) {
    for (const tile of meld.tiles) {
      if (isHonor(tile)) {
        return { han: 0, yaku: [] };
      }
    }
  }

  for (const tile of pair) {
    if (isHonor(tile)) {
      return { han: 0, yaku: [] };
    }
  }

  // Rule 1: every meld must contain at least one terminal
  const meldsValid = melds.every(meld =>
    meld.tiles.some(isTerminal)
  );

  if (!meldsValid) {
    return { han: 0, yaku: [] };
  }

  // Rule 2: pair must be terminal
  const pairIsTerminal = pair.some(isTerminal);
  if (!pairIsTerminal) {
    return { han: 0, yaku: [] };
  }

  return {
    han: closed ? 3 : 2,
    yaku: ["Fully Outside Hand (3/2 han)"]
  };
}
