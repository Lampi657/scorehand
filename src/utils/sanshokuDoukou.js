function getPonNumber(meld) {
  if (meld.type !== "pon" && meld.type !== "kan") return null;
  return parseInt(meld.tiles[0][0], 10);
}

export function detectSanshokuDoukou(handData) {
  const { melds } = handData;

  // Only pons/kans count
  const triplets = melds.filter(
    m => m.type === "pon" || m.type === "kan"
  );

  if (triplets.length < 3) {
    return { han: 0, yaku: [] };
  }

  // Map: number -> set of suits
  const map = new Map();

  for (const meld of triplets) {
    const tile = meld.tiles[0]; // e.g. "2m"
    const num = parseInt(tile[0], 10);
    const suit = tile[1];

    // Honors cannot form sanshoku doukou
    if (!["m", "p", "s"].includes(suit)) continue;

    if (!map.has(num)) {
      map.set(num, new Set());
    }

    map.get(num).add(suit);
  }

  for (const suits of map.values()) {
    if (suits.has("m") && suits.has("p") && suits.has("s")) {
      return {
        han: 2,
        yaku: ["Mixed Triple Pon (2 han)"]
      };
    }
  }

  return { han: 0, yaku: [] };
}
