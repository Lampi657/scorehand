import detectYakuhai from "../utils/yakuhai";
import { detectTanyao } from "../utils/tanyao";
import { detectPinfu } from "../utils/pinfu";
import { detectToitoi } from "../utils/toitoi";
import { detectIipeikou } from "../utils/iipeikou";
import { detectHonroutou } from "../utils/honroutou";
import { detectChantaiyao } from "../utils/chantaiyao";
import { detectJunchan } from "../utils/outsidehand";
import { detectSanshokuDoujun } from "../utils/sanshokuDoujun";
import { detectSanshokuDoukou } from "../utils/sanshokuDoukou";
import { detectIttsu } from "../utils/ittsu";
import { detectHonitsu } from "../utils/halfFlush";
import { detectChinitsu } from "../utils/fullFlush";
import { detectSanankou } from "../utils/sanankou";
import { detectSankantsu } from "../utils/sankantsu";
import { detectShousangen } from "../utils/shousangen";
import { detectRyanpeikou } from "../utils/ryanpeikou";
import detectRiichi from "../utils/detectRiichi";

export default function calculateYaku(handData, riichi) {
  const results = [];

  const chinitsu = detectChinitsu(handData);
  results.push(chinitsu);
  
  if (chinitsu.han === 0) {
    results.push(detectHonitsu(handData));
  }
  
  const ryan = detectRyanpeikou(handData);
  if (ryan.han > 0) {
    results.push(ryan);
  } else {
    results.push(detectIipeikou(handData));
  }

  const honroutou = detectHonroutou(handData);
  results.push(honroutou);

  const junchan = honroutou.han === 0
    ? detectJunchan(handData)
    : { han: 0, yaku: [] };

  results.push(junchan);

  if (honroutou.han === 0 && junchan.han === 0) {
    results.push(detectChantaiyao(handData));
  }

  results.push(detectSanshokuDoujun(handData));
  results.push(detectSanshokuDoukou(handData));
  results.push(detectIttsu(handData));
  results.push(detectSanankou(handData));
  results.push(detectShousangen(handData));
  results.push(detectToitoi(handData));
  results.push(detectSankantsu(handData));
  results.push(detectYakuhai(handData));
  results.push(detectTanyao(handData));
  results.push(detectPinfu(handData));
  results.push(detectRiichi(handData, riichi));

  const han = results.reduce((sum, r) => sum + r.han, 0);
  const yaku = results.flatMap(r => r.yaku);

  return { han, yaku };
}
