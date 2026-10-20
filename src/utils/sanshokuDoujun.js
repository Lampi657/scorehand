function getChiSequence(meld) {
  if (meld.type !== "chi") return null;

  // tile format: "1m", "2m", "3m"
  const nums = meld.tiles.map(t => parseInt(t[0], 10)).sort((a, b) => a - b);
  const suit = meld.tiles[0][1];

  return {
    start: nums[0], // 1–7
    suit
  };
}

export function detectSanshokuDoujun(handData) {
  const { melds, closed } = handData;

  // Only chi can form sanshoku
  const chis = melds.filter(m => m.type === "chi");
  if (chis.length < 3) {
    return { han: 0, yaku: [] };
  }

  // Map: startNumber -> set of suits
  const sequences = new Map();

  for (const meld of chis) {
    const tiles = meld.tiles;

    const nums = tiles.map(t => parseInt(t[0], 10)).sort((a, b) => a - b);
    const suit = tiles[0][1];

    // Ensure it really is a sequence (safety)
    if (
      nums[1] !== nums[0] + 1 ||
      nums[2] !== nums[0] + 2
    ) {
      continue;
    }

    const start = nums[0];

    if (!sequences.has(start)) {
      sequences.set(start, new Set());
    }

    sequences.get(start).add(suit);
  }

  // Check for man + pin + sou
  for (const suits of sequences.values()) {
    if (suits.has("m") && suits.has("p") && suits.has("s")) {
      return {
        han: closed ? 2 : 1,
        yaku: ["Mixed Triple Chi (2/1 han)"]
      };
    }
  }

  return { han: 0, yaku: [] };
}
