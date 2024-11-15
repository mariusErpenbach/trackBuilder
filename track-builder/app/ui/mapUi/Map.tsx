import { useState, useEffect } from "react";

type Tile = JSX.Element;

export default function Map() {
  const [mapSize, setMapSize] = useState<number>(64); // Standardgröße der Map (64 Tiles)
  const [tiles, setTiles] = useState<Tile[]>([]);

  // Berechne die Anzahl der Spalten (Quadratwurzel der Anzahl der Tiles)
  const columns = Math.sqrt(mapSize);

  useEffect(() => {
    const generatedTiles: Tile[] = Array.from({ length: mapSize }, (_, index) => (
      <div key={index} className="tile">
        {index + 1}
      </div>
    ));
    setTiles(generatedTiles);
  }, [mapSize]);

  return (
    <div>

      <div id="map" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {tiles}
      </div>
    </div>
  );
}
