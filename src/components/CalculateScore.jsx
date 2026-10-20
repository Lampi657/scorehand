export default function calculateScore({
  han,
  fu,
  isDealer,
  winMethod, // "ron" | "tsumo"
  kiriageMangan = false
}) {
  if (han <= 0) {
    return {
      basePoints: 0,
      totalPoints: 0,
      payments: null,
      limit: null
    };
  }

  // 🧱 1️⃣ Handle Chiitoitsu special case

  fu = Math.ceil(fu / 10) * 10;
  

  // 🧮 2️⃣ Calculate Base Points
  let basePoints = fu * Math.pow(2, han + 2);
  let limit = null;

  // 🏆 3️⃣ Apply Limits
  if (han >= 13) {
    basePoints = 8000;
    limit = "Yakuman";
  } else if (han >= 11) {
    basePoints = 6000;
    limit = "Sanbaiman";
  } else if (han >= 8) {
    basePoints = 4000;
    limit = "Baiman";
  } else if (han >= 6) {
    basePoints = 3000;
    limit = "Haneman";
  } else if (
    han === 5 ||
    (han === 4 && fu >= 40) ||
    (han === 3 && fu >= 70)
  ) {
    basePoints = 2000;
    limit = "Mangan";
  } else if (
    kiriageMangan &&
    han === 4 &&
    fu === 30
  ) {
    // Optional kiriage mangan (common rule)
    basePoints = 2000;
    limit = "Kiriage Mangan";
  }

  // 💰 4️⃣ Calculate Final Payments
  let totalPoints = 0;
  let payments = null;

  if (winMethod === "ron") {
    const multiplier = isDealer ? 6 : 4;
    totalPoints =
      Math.ceil((basePoints * multiplier) / 100) * 100;

    payments = {
      fromDiscarder: totalPoints
    };
  }

  if (winMethod === "tsumo") {
    if (isDealer) {
      const payment =
        Math.ceil((basePoints * 2) / 100) * 100;

      totalPoints = payment * 3;

      payments = {
        fromEachPlayer: payment
      };
    } else {
      const dealerPays =
        Math.ceil((basePoints * 2) / 100) * 100;

      const othersPay =
        Math.ceil(basePoints / 100) * 100;

      totalPoints = dealerPays + othersPay * 2;

      payments = {
        dealer: dealerPays,
        others: othersPay
      };
    }
  }

  return {
    han,
    fu,
    basePoints,
    totalPoints,
    payments,
    limit
  };
}
