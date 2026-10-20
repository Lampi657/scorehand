export default function calcPairFu(pair, context) {
  if (!pair) return 0;

  let fu = 0;

  const tile = pair[0];

  // Dragons
  if (["O", "G", "R"].includes(tile)) {
    fu += 2;
  }

  // Seat wind
  if (tile === context.seatWind) {
    fu += 2;
  }

  // Round wind
  if (tile === context.roundWind) {
    fu += 2;
  }

  return fu;
}
