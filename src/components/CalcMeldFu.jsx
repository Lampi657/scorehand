const HONORS = ["E","S","W","N","O","G","R"];

export default function calcMeldFu(melds) {
  let fu = 0;

  melds.forEach(m => {
    if (m.type !== "pon" && m.type !== "kan") return;

    const tile = m.tiles[0];

    const isHonor = HONORS.includes(tile);

    const isTerminal =
      !isHonor &&
      ["1","9"].includes(tile[0]);

    const isYaochu = isHonor || isTerminal;

    // 🀄 Pon
    if (m.type === "pon") {
      if (m.open) {
        fu += isYaochu ? 4 : 2;
      } else {
        fu += isYaochu ? 8 : 4;
      }
    }

    // 🀄 Kan
    if (m.type === "kan") {
      if (m.open) {
        fu += isYaochu ? 16 : 8;
      } else {
        fu += isYaochu ? 32 : 16;
      }
    }
  });

  return fu;
}
