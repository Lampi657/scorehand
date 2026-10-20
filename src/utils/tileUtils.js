export function isHonor(tile) {
  return ["E", "S", "W", "N", "O", "G", "R"].includes(tile);
}

export function isTerminal(tile) {
  if (isHonor(tile)) return false;
  const num = parseInt(tile[0], 10);
  return num === 1 || num === 9;
}

export function isTerminalOrHonor(tile) {
  return isHonor(tile) || isTerminal(tile);
}

export function isSimple(tile) {
  return !isHonor(tile) && !isTerminal(tile);
}

export function isDragon(tile) {
  return ["O", "G", "R"].includes(tile);
}

export function isWind(tile) {
  return ["E", "S", "W", "N"].includes(tile);
}
