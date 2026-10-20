import { useState } from "react";
import Tile from "./Tile";

const TILES = [
  "1m","2m","3m","4m","5m","6m","7m","8m","9m",
  "1p","2p","3p","4p","5p","6p","7p","8p","9p",
  "1s","2s","3s","4s","5s","6s","7s","8s","9s",
  "E","S","W","N","O","G","R"
];

function getTileCounts(hand) {
  const counts = {};

  hand.melds.forEach(meld => {
    meld.tiles.forEach(tile => {
      counts[tile] = (counts[tile] || 0) + 1;
    });
  });

  if (hand.pair) {
    hand.pair.forEach(tile => {
      counts[tile] = (counts[tile] || 0) + 1;
    });
  }

  return counts;
}

function isChi(tiles) {
  const suits = tiles.map(t => t.slice(-1));
  if (!["m","p","s"].includes(suits[0])) return false;
  if (!suits.every(s => s === suits[0])) return false;

  const nums = tiles.map(t => parseInt(t[0], 10)).sort((a,b) => a-b);
  return nums[1] === nums[0] + 1 && nums[2] === nums[1] + 1;
}

export default function TilePalette({
  hand,
  onAddMeld,
  onSetPair,
  canAddMeld,
  canAddPair
}) {
  const [selected, setSelected] = useState([]);
  const [meldOpen, setMeldOpen] = useState(false); // general open/closed toggle

  const counts = getTileCounts(hand);

  const selectedCount = tile =>
    selected.filter(t => t === tile).length;

  const addTile = tile => {
    const used = (counts[tile] || 0) + selectedCount(tile);
    if (used >= 4) return; // cannot select more than 4
    setSelected(prev => [...prev, tile]);
  };

  const clearSelection = () => {
    setSelected([]);
    setMeldOpen(false);
  };

  const makeMeld = type => {
    onAddMeld({
      type,
      tiles: selected,
      open: meldOpen
    });
    clearSelection();
  };

  const makePair = () => {
    onSetPair(selected);
    clearSelection();
  };

  const canChi =
    selected.length === 3 &&
    isChi(selected) &&
    canAddMeld;

  const canPon =
    selected.length === 3 &&
    selected.every(t => t === selected[0]) &&
    canAddMeld;

  const canKan =
    selected.length === 4 &&
    selected.every(t => t === selected[0]) &&
    canAddMeld;

  const canPair =
    selected.length === 2 &&
    selected[0] === selected[1] &&
    canAddPair;

  return (
    <div className="palette">
      <div className="tiles">
        {TILES.map(tile => {
          const used = counts[tile] || 0;
          const selCount = selectedCount(tile);
          const remaining = 4 - used - selCount;
          const disabled = remaining === 0;

          return (
            <div
              key={tile}
              className={`palette-tile
                ${selCount > 0 ? "selected" : ""}
                ${disabled ? "disabled" : ""}
              `}
              onClick={() => !disabled && addTile(tile)}
            >
              <Tile tile={tile} />

              {/* remaining in wall */}
              <span className="remaining">{remaining}</span>

              {/* selected overlay */}
              {selCount > 0 && (
                <span className="selected-count">×{selCount}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="controls">
        {/* Open/Closed toggle for melds */}
        {selected.length >= 3 && (
          <label className="meld-toggle">
            <input
              type="checkbox"
              checked={meldOpen}
              onChange={e => setMeldOpen(e.target.checked)}
            />
            Open
          </label>
        )}

        <button disabled={!canChi} onClick={() => makeMeld("chi")}>
          Chi
        </button>

        <button disabled={!canPon} onClick={() => makeMeld("pon")}>
          Pon
        </button>

        <button disabled={!canKan} onClick={() => makeMeld("kan")}>
          Kan
        </button>

        <button disabled={!canPair} onClick={makePair}>
          Pair
        </button>

        <button onClick={clearSelection}>
          Clear
        </button>
      </div>
    </div>
  );
}

