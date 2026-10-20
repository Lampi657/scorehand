// detectRiichi.js
export default function detectRiichi(handData, riichiDeclared) {
  const { closed } = handData;

  if (!riichiDeclared) {
    return { han: 0, yaku: [] };
  }

  if (!closed) {
    return { han: 0, yaku: [] };
  }

  return {
    han: 1,
    yaku: ["Riichi"]
  };
}
