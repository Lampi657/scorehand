export default function detectWaitType(handData) {
  const { melds, win } = handData;

  if (!win?.source) return "unknown";

  // 🀄 Tanki
  if (win.source.type === "pair") {
    return "tanki";
  }

  const meld = melds[win.source.meldIndex];

  if (!meld) return "unknown";

  // 🀄 Shanpon
  if (meld.type === "pon" || meld.type === "kan") {
    return "shanpon";
  }

  // 🀄 Sequence logic
  if (meld.type === "chi") {
    const tiles = [...meld.tiles];

    // Extract numbers
    const numbers = tiles.map(t => parseInt(t[0], 10)).sort(
      (a, b) => a - b
    );

    const winningTile = meld.tiles[win.source.tileIndex];

    if (!winningTile) return "unknown";

    const winNum = parseInt(winningTile[0], 10);

    // middle tile
    if (winNum === numbers[1]) {
      return "kanchan";
    }

    // edge waits
    if (numbers[0] === 1 && winNum === 3) {
      return "penchan";
    }

    if (numbers[2] === 9 && winNum === 7) {
      return "penchan";
    }

    return "ryanmen";
  }

  return "unknown";
}
