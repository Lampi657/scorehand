import detectWaitType from "./DetectWaitType";

export default function calcWaitFu(handData) {
  const wait = detectWaitType(handData);
  
  //console.log("wait type:", wait);
  
  if (["tanki","kanchan","penchan"].includes(wait)) {
    return 2;
  }

  return 0;
}
