function normalizeChi(meld) {
  // meld.tiles like ["3m","4m","5m"]
  return meld.tiles.join("-");
}

export function detectRyanpeikou(handData) {
  const { melds, closed } = handData;

  // Must be closed
  if (!closed) {
    return { han: 0, yaku: [] };
  }

  // Must have exactly 4 chi melds
  const chis = melds.filter(m => m.type === "chi");
  if (chis.length !== 4) {
    return { han: 0, yaku: [] };
  }

  // Count identical sequences
  const sequenceCounts = {};

  chis.forEach(meld => {
    const key = meld.tiles.join("-");
    sequenceCounts[key] = (sequenceCounts[key] || 0) + 1;
  });

  // Ryanpeikou = exactly two sequences appearing twice
  const pairs = Object.values(sequenceCounts).filter(
    count => count === 2
  );

  if (pairs.length === 2) {
    return {
      han: 3,
      yaku: ["Ryanpeikou (3 han)"]
    };
  }

  return { han: 0, yaku: [] };
}
