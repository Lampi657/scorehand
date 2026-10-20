import { isTerminalOrHonor } from "./tileUtils";

// Half outside hand

export function detectChantaiyao(handData) {
  const { melds, pair, closed } = handData;

  // Must have a standard complete hand
  if (!pair || melds.length !== 4) {
    return { han: 0, yaku: [] };
  }

  // Rule: every meld must contain at least one terminal or honor
  const meldsValid = melds.every(meld =>
    meld.tiles.some(isTerminalOrHonor)
  );

  if (!meldsValid) {
    return { han: 0, yaku: [] };
  }

  // Rule: pair must contain a terminal or honor
  const pairValid = pair.some(isTerminalOrHonor);
  if (!pairValid) {
    return { han: 0, yaku: [] };
  }

  return {
    han: closed ? 2 : 1,
    yaku: ["Half Outside (2/1 han)"]
  };
}
