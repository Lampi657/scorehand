const WINDS = ["E", "S", "W", "N"];

export default function WindSelector({ win, onChange }) {
  const setSeatWind = seatWind =>
    onChange({ ...win, seatWind });

  const setRoundWind = roundWind =>
    onChange({ ...win, roundWind });

  return (
    <div className="wind-selector">
      <h6>Winds</h6>

      <div className="wind-row">
        <span>Seat:</span>
        {WINDS.map(w => (
          <button
            key={w}
            className={win.seatWind === w ? "selected" : ""}
            onClick={() => setSeatWind(w)}
          >
            {w}
          </button>
        ))}
      </div>

      <div className="wind-row">
        <span>Round:</span>
        {WINDS.map(w => (
          <button
            key={w}
            className={win.roundWind === w ? "selected" : ""}
            onClick={() => setRoundWind(w)}
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  );
}
