export function detectSanankou(handData) {
  const { melds, win } = handData;

  let concealedTriplets = 0;

  melds.forEach((meld, meldIndex) => {
    if (meld.type !== "pon" && meld.type !== "kan") return;

    // Open melds are never concealed
    if (meld.open) return;

    // Closed kan is always concealed
    if (meld.type === "kan") {
      concealedTriplets++;
      return;
    }

    // Pon: special ron interaction
    if (meld.type === "pon") {
      const isRonCompletion =
        win?.method === "ron" &&
        win?.source?.type === "meld" &&
        win.source.meldIndex === meldIndex;

      if (isRonCompletion) {
        // Ron-completed pon is NOT concealed
        return;
      }

      concealedTriplets++;
    }
  });

  if (concealedTriplets >= 3) {
    return {
      han: 2,
      yaku: ["Three Concealed Pon (2 han)"]
    };
  }

  return { han: 0, yaku: [] };
}
