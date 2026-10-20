const DRAGONS = ["O", "G", "R"];

export function detectShousangen(handData) {
  const { melds, pair } = handData;

  if (!pair) {
    return { han: 0, yaku: [] };
  }

  // Pair must be a dragon
  const pairTile = pair[0];
  if (!DRAGONS.includes(pairTile)) {
    return { han: 0, yaku: [] };
  }

  let dragonTriplets = 0;

  melds.forEach(meld => {
    if (meld.type !== "pon" && meld.type !== "kan") return;

    const tile = meld.tiles[0];
    if (DRAGONS.includes(tile)) {
      dragonTriplets++;
    }
  });

  if (dragonTriplets === 2) {
    return {
      han: 2,
      yaku: ["Small Dragons (2 han)"]
    };
  }

  return { han: 0, yaku: [] };
}
