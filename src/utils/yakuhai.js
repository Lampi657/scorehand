const DRAGONS = ["O", "G", "R"];

function isDragon(tile) {
  return DRAGONS.includes(tile);
}

function isWind(tile) {
  return ["E", "S", "W", "N"].includes(tile);
}

export default function detectYakuhai(handData) {
  const { melds, win } = handData;
  const { seatWind, roundWind } = win;

  let han = 0;
  const yaku = [];

  melds.forEach(meld => {
    if (meld.type !== "pon" && meld.type !== "kan") return;

    const tile = meld.tiles[0]; // all same tile

    // Dragon yakuhai
    if (isDragon(tile)) {
      han += 1;
      yaku.push(`Yakuhai (${tile})`);
    }

    // Wind yakuhai
    if (isWind(tile)) {
      if (tile === seatWind) {
        han += 1;
        yaku.push("Yakuhai (Seat Wind)");
      }
      if (tile === roundWind) {
        han += 1;
        yaku.push("Yakuhai (Round Wind)");
      }
    }
  });

  return {
    han,
    yaku
  };
}
