export default function calcWinTypeFu(closed, context) {
  let fu = 0;

  if (context.method === "tsumo") {
    fu += 2;
  } else if (closed) {
    fu += 10;
  }

  return fu;
}
