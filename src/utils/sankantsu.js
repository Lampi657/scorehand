export function detectSankantsu(handData) {
  const { melds } = handData;

  const kanCount = melds.filter(
    meld => meld.type === "kan"
  ).length;

  if (kanCount >= 3) {
    return {
      han: 2,
      yaku: ["Three Kans (2 han)"]
    };
  }

  return { han: 0, yaku: [] };
}
