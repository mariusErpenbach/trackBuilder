'use client'
import { useState } from "react";
import MapEditorMenu from "../ui/mapUi/MapEditorMenu";
import Map from "../ui/mapUi/Map";
import roads from "../data/roads.json";

export default function MapPage() {
  const [toggledOption, setToggledOption] = useState<Object | null | string>(null);

  function toggleOption(option: string) {
    if(option == "deleteOption" || option =="newStartingPoint" || option =="newFinishingPoint"){
      setToggledOption(option)
    }
    else{
    const selectedRoad = roads.find((road) => road.id === option) || null;
    setToggledOption(selectedRoad);}
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
