import { isSimple } from "./tileUtils";

export function detectTanyao(handData) {
  const { melds, pair } = handData;

  const allTiles = [];

  melds.forEach(meld => {
    allTiles.push(...meld.tiles);
  });

  if (pair) {
    allTiles.push(...pair);
  }

  const isTanyao = allTiles.every(isSimple);

  if (!isTanyao) {
    return { han: 0, yaku: [] };
  }

  return {
    han: 1,
    yaku: ["Tanyao (1 han)"]
  };
}
