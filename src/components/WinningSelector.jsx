import Tile from "./Tile";

export default function WinningSelector({
  tileSources,
  win,
  onChange
}) {
  const setMethod = method => {
    onChange({ ...win, method });
  };

  const setWinningTile = source => {
    onChange({
      ...win,
      tile: source.tile,
      source: {
        type: source.type,
        meldIndex: source.meldIndex,
        tileIndex: source.tileIndex
      }
    });
  };

  const isSelected = source =>
    win?.source &&
    win.source.type === source.type &&
    win.source.meldIndex === source.meldIndex &&
    win.source.tileIndex === source.tileIndex;

  return (
    <div className="winning-selector">
      <h5>Win</h5>

      <div className="win-method">
        <label>
          <input
            type="radio"
            name="winMethod"
            checked={win.method === "tsumo"}
            onChange={() => setMethod("tsumo")}
          />
          Tsumo
        </label>

        <label>
          <input
            type="radio"
            name="winMethod"
            checked={win.method === "ron"}
            onChange={() => setMethod("ron")}
          />
          Ron
        </label>
      </div>

      {win.method && (
        <>
          <h5>Winning tile</h5>

          <div className="winning-tiles">
            {tileSources.map((source, i) => (
              <button
                key={i}
                className={`winning-tile ${
                  isSelected(source) ? "selected" : ""
                }`}
                onClick={() => setWinningTile(source)}
              >
                <Tile tile={source.tile} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}