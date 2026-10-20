function getChiInfo(meld) {
  if (meld.type !== "chi") return null;

  const nums = meld.tiles
    .map(t => parseInt(t[0], 10))
    .sort((a, b) => a - b);

  const suit = meld.tiles[0][1];

  return { start: nums[0], suit };
}

export function detectIttsu(handData) {
  const { melds, closed } = handData;

  const chis = melds.filter(m => m.type === "chi");
  if (chis.length < 3) {
    return { han: 0, yaku: [] };
  }

  // Map: suit -> set of chi starts
  const map = new Map();

  for (const meld of chis) {
    const tiles = meld.tiles;

    const nums = tiles
      .map(t => parseInt(t[0], 10))
      .sort((a, b) => a - b);

    // Ensure valid chi
    if (
      nums[1] !== nums[0] + 1 ||
      nums[2] !== nums[0] + 2
    ) {
      continue;
    }

    const start = nums[0];
    const suit = tiles[0][1];

    if (!map.has(suit)) {
      map.set(suit, new Set());
    }

    map.get(suit).add(start);
  }

  for (const starts of map.values()) {
    if (
      starts.has(1) &&
      starts.has(4) &&
      starts.has(7)
    ) {
      return {
        han: closed ? 2 : 1,
        yaku: ["Straigth (2/1 han)"]
      };
    }
  }

  return { han: 0, yaku: [] };
}
