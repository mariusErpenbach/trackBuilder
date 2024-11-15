'use client'
import { useState, useEffect } from "react";
import MapEditorMenu from "../ui/mapUi/MapEditorMenu";
import Map from "../ui/mapUi/Map";
type Tile = JSX.Element;

export default function MapPage() {
  const [mapSize, setMapSize] = useState<number>(64); // Standardgröße der Map (64 Tiles)
  const [tiles, setTiles] = useState<Tile[]>([]);

  // Berechne die Anzahl der Spalten dynamisch als Quadratwurzel der Anzahl der Tiles
  const columns = Math.round(Math.sqrt(mapSize));

  useEffect(() => {
    const generatedTiles: Tile[] = Array.from({ length: mapSize }, (_, index) => (
      <div key={index} className="tile">{index+1}</div>
    ));
    setTiles(generatedTiles);
  }, [mapSize]);

  return (
    <div id="mapPage" >
    <MapEditorMenu></MapEditorMenu>
    <Map></Map>
    </div>
  );
}
