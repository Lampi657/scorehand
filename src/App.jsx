import { useState } from "react";
import HandDisplay from "./components/HandDisplay";
import TilePalette from "./components/TilePalette";
import WinningSelector from "./components/WinningSelector";
import WindSelector from "./components/WindSelector";
import calculateYaku from "./components/CalculateYaku";
import { calculateFu } from "./components/CalculateFu";
import calculateScore from "./components/CalculateScore";

import "./styles/tiles.css";

function countTiles(hand) {
  let count = 0;

  hand.melds.forEach(meld => {
    count += meld.tiles.length;
  });

  if (hand.pair) count += 2;

  return count;
}

function getAllTiles(hand) {
  const tiles = [];

  hand.melds.forEach(meld => {
    tiles.push(...meld.tiles);
  });

  if (hand.pair) {
    tiles.push(...hand.pair);
  }

  return tiles;
}

function normalizeHand(hand, win) {
  return {
    melds: hand.melds,
    pair: hand.pair,
    closed: hand.melds.every(m => !m.open),
    win
  };
}

function buildWinningTileSources(hand) {
  const sources = [];

  hand.melds.forEach((meld, meldIndex) => {
    meld.tiles.forEach((tile, tileIndex) => {
      sources.push({
        type: "meld",
        meldIndex,
        tileIndex,
        tile
      });
    });
  });

  if (hand.pair) {
    hand.pair.forEach((tile, tileIndex) => {
      sources.push({
        type: "pair",
        tileIndex,
        tile
      });
    });
  }

  return sources;
}

export default function App() {
  const [hand, setHand] = useState({
    melds: [],
    pair: null
  });

  const [win, setWin] = useState({
    method: null,   // "tsumo" | "ron"
    source: null,         // winning tile string
    seatWind: "E",
    roundWind: "E"
  });

  const [riichi, setRiichi] = useState(false);

  const canAddMeld = hand.melds.length < 4;
  const canAddPair = hand.pair === null;
  const [locked, setLocked] = useState(false);

  const addMeld = meld => {
    if (!canAddMeld) return;
    setHand({
      ...hand,
      melds: [...hand.melds, meld]
    });
  };

  const removeMeld = index => {
    setHand({
      ...hand,
      melds: hand.melds.filter((_, i) => i !== index)
    });
  };

  const setPair = tiles => {
    if (tiles.length !== 2) return;
    setHand({ ...hand, pair: tiles });
  };

  const clearPair = () => {
    setHand({ ...hand, pair: null });
  };

  const tileCount = countTiles(hand);
  const isComplete =
    hand.melds.length === 4 &&
    hand.pair !== null;

  const allTiles = getAllTiles(hand);
  
  const canCalculate =
    isComplete &&
    win.method !== null &&
    win.tile !== null;

  const tileSources = buildWinningTileSources(hand);

  const analysis = normalizeHand(hand, win);
  
    return (
    <div className="app">
      <h5>Hand input</h5>

      <HandDisplay
        hand={hand}
        win={win}
        onRemoveMeld={removeMeld}
        onClearPair={clearPair}
      />

      {analysis.closed && (
  <button
    onClick={() => setRiichi(prev => !prev)}
    className={riichi ? "active-riichi" : ""}
  >
    {riichi ? "Riichi Declared" : "Riichi"}
  </button>
)}

      <TilePalette
        hand={hand}
        onAddMeld={addMeld}
        onSetPair={setPair}
        canAddMeld={canAddMeld}
        canAddPair={canAddPair}
      />

      {isComplete && (
        <WindSelector
          win={win}
          onChange={setWin}
        />
      )}

      {isComplete && (
        <WinningSelector
          tileSources={tileSources}
          win={win}
          onChange={setWin}
        />
      )}

      <button onClick={() => {
        const analysis = normalizeHand(hand, win);
        const yakuResults = calculateYaku(analysis, riichi);
        const fuResults = calculateFu(analysis, win);

        
        console.log(analysis);
        console.log({ yakuResults });
        console.log({ fuResults });
        
      }}>Analysis</button>

      {canCalculate && (
        <button onClick={() => {
          const analysis = normalizeHand(hand, win);
        const yakuResults = calculateYaku(analysis, riichi);
        const fuResults = calculateFu(analysis, win);

          let isDealer = false;
          if (win.seatWind === win.roundWind) {
            isDealer = true;
          }
          const scoreResults = calculateScore({ han: yakuResults.han, fu: fuResults.fu, isDealer, winMethod: win.method });
          console.log({ scoreResults });          
        }}>
          Calculate Points
        </button>
      )}
    </div>
  );
}
