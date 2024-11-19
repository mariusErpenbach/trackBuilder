import { useState, useEffect } from "react";

export default function Map(props: any) {
  const [mapSize, setMapSize] = useState<number>(64);
  const columns = Math.sqrt(mapSize);

  function handleTileClick(index: number) {
    const clickedTile = document.getElementById("tile" + index);
    if (clickedTile) {
      clickedTile.innerText = props.toggledOption
        ? `${props.toggledOption.symbol}`
        : "No road selected";
    }
  }

  return (
    <div id="map" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: mapSize }).map((_, index) => (
        <div
          key={index}
          id={`tile${index}`}
          className="tile"
          onClick={() => handleTileClick(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}
