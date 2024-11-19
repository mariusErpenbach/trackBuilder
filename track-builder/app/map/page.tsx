'use client'
import { useState } from "react";
import MapEditorMenu from "../ui/mapUi/MapEditorMenu";
import Map from "../ui/mapUi/Map";
import roads from "../data/roads.json";

export default function MapPage() {
  const [toggledOption, setToggledOption] = useState<Object | null>(null);

  function toggleOption(roadId: string) {
    const selectedRoad = roads.find((road) => road.id === roadId) || null;
    console.log("Selected road:", selectedRoad);
    setToggledOption(selectedRoad);
  }

  function untoggleOption() {
    setToggledOption(null);
  }

  return (
    <div id="mapPage">
      <MapEditorMenu
        untoggleOption={untoggleOption}
        toggleOption={toggleOption}
      />
      <Map toggledOption={toggledOption} />
    </div>
  );
}
