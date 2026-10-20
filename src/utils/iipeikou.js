function chiKey(meld) {
  // meld.tiles like ["2m", "3m", "4m"]
  return meld.tiles
    .slice()
    .sort()
    .join("-");
}
export function detectIipeikou(handData) {
  const { melds, closed } = handData;

  // Rule 1: must be closed
  if (!closed) {
    return { han: 0, yaku: [] };
  }

  // Collect only chi melds
  const chis = melds.filter(m => m.type === "chi");

  if (chis.length < 2) {
    return { han: 0, yaku: [] };
  }

  const counts = {};

  chis.forEach(meld => {
    const key = chiKey(meld);
    counts[key] = (counts[key] || 0) + 1;
  });

  // Rule 2: any identical chi appearing at least twice
  const hasIipeikou = Object.values(counts).some(
    count => count >= 2
  );

  if (!hasIipeikou) {
    return { han: 0, yaku: [] };
  }

  return {
    han: 1,
    yaku: ["Iipeikou (1 han)"]
  };
}
