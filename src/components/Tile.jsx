import "../styles/tiles.css";

function parseTile(tile) {
  // Honors
  if (tile.length === 1) {
    return {
      label: honorLabel(tile),
      suitClass: honorClass(tile)
    };
  }

  const number = tile[0];
  const suit = tile[1];

  return {
    label: number,
    suitClass: suitClassMap[suit]
  };
}

function honorLabel(tile) {
  switch (tile) {
    case "E": return "東";
    case "S": return "南";
    case "W": return "西";
    case "N": return "北";
    case "O": return "白";
    case "G": return "發";
    case "R": return "中";
    default: return tile;
  }
}

function honorClass(tile) {
  switch (tile) {
    case "O": return "honor dragon white";
    case "G": return "honor dragon green";
    case "R": return "honor dragon red";
    default:  return "honor wind";
  }
}

const suitClassMap = {
  m: "man",
  p: "pin",
  s: "sou"
};

export default function Tile({
  tile,
  onClick,
  className = "",
  highlight = false
}) {
  const { label, suitClass } = parseTile(tile);

  return (
    <div
      className={`tile ${suitClass} ${className} ${
        highlight ? "winning" : ""
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
