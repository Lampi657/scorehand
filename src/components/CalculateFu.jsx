import calcMeldFu from "./CalcMeldFu";
import calcPairFu from "./CalcPairFu";
import calcWinTypeFu from "./CalcWinTypeFu";
import calcWaitFu from "./CalcWaitFu";

export function calculateFu(handData, context) {
  const { melds, closed } = handData;

  

  let fu = 20;

  fu += calcMeldFu(melds);
  fu += calcPairFu(handData.pair, context);
  fu += calcWinTypeFu(closed, context);
  fu += calcWaitFu(handData);

  

  function roundUpFu(fu) {
    return Math.ceil(fu / 10) * 10;
  }

  //return roundUpFu(fu);
  return { fu };
}
