import Tile from "./Tile";

export default function HandDisplay({
  hand,
  win,
  onRemoveMeld,
  onClearPair
}) {
  return (
    <div className="hand">
      <div className="melds">
        {hand.melds.map((meld, meldIdx) => {

          return (
            <div key={meldIdx} className="meld">
              <div className="meld-tiles">
                {meld.tiles.map((tile, tileIdx) => {
                  const highlight =
                    win?.source?.type === "meld" &&
                    win.source.meldIndex === meldIdx &&
                    win.source.tileIndex === tileIdx;

                
                  return (
                    <Tile
                      key={tileIdx}
                      tile={tile}
                      className={meld.type}
                      highlight={highlight}
                    />
                  );
                })}
              </div>

              <div className="meld-info">
                <span className="meld-type">
                  {meld.type.toUpperCase()}
                  {meld.open ? " (open)" : " (closed)"}
                </span>
                <button onClick={() => onRemoveMeld(meldIdx)}>
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pair">
        {hand.pair && (
          <>
            <div className="pair-tiles">
              {hand.pair.map((tile, idx) => {
                const highlight =
                  win?.source?.type === "pair" &&
                  win.source.tileIndex === idx;


                return (
                  <Tile
                    key={idx}
                    tile={tile}
                    highlight={highlight}
                  />
                );
              })}
            </div>
            <button onClick={onClearPair}>✕</button>
          </>
        )}
      </div>
    </div>
  );
}
