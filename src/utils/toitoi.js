export function detectToitoi(handData) {
  const { melds } = handData;

  // Must have exactly 4 melds
  if (melds.length !== 4) {
    return { han: 0, yaku: [] };
  }

  const isToitoi = melds.every(
    m => m.type === "pon" || m.type === "kan"
  );

  if (!isToitoi) {
    return { han: 0, yaku: [] };
  }

  return {
    han: 2,
    yaku: ["All Pon (2 han)"]
  };
}
