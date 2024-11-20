import { useState, useEffect } from "react";

export default function Map(props: any) {
  const [mapSize, setMapSize] = useState<number>(64);
  const columns = Math.sqrt(mapSize);

  function handleTileClick(index: number) {
    if(props.toggledOption==null){return""}  

    const clickedTile = document.getElementById("tile" + index);
    if(props.toggledOption=="deleteOption"){
      clickedTile? clickedTile.innerHTML = `${index}`:""
    }else{
    if (clickedTile) {
     let newTileContent = document.createElement("div")
     newTileContent.className = props.toggledOption.id
     clickedTile.innerText="";
     clickedTile.appendChild(newTileContent)
    }}
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
          {index}
        </div>
      ))}
    </div>
  );
}
