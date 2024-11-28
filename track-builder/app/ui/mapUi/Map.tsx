import React, { useState } from "react";
import Road from "../roads/road";

export default function Map(props: any) {
  const [mapSize, setMapSize] = useState<number>(64);
  const [tileContent, setTileContent] = useState<{ [key: number]: React.ReactNode }>({});
  const [startingPoint, setStartingPoint] = useState<number | undefined>(undefined);
  const [finishingPoint, setFinishingPoint] = useState<number | undefined>(undefined);

  const columns = Math.sqrt(mapSize);

  // Hauptfunktion, die beim Klick auf eine Tile aufgerufen wird
  function handleTileClick(index: number) {
    if (props.toggledOption == null) return;

    // Löschen-Option
    if (props.toggledOption === "deleteOption") {
      setTileContent((prev) => {
        const updatedContent = { ...prev };
        delete updatedContent[index];
        return updatedContent;
      });

      // Start- oder Endpunkt entfernen, falls vorhanden
      if (startingPoint === index) setStartingPoint(undefined);
      if (finishingPoint === index) setFinishingPoint(undefined);

    } else if (props.toggledOption === "newStartingPoint") {
      // Startpunkt setzen
      setStartingPointTile(index);

    } else if (props.toggledOption === "newFinishingPoint") {
      // Endpunkt setzen
      setFinishingPointTile(index);

    } else {
      addRoad(index);
    }
  }

  // Funktion zum Hinzufügen einer Straße
  function addRoad(index: number) {
    // Überprüfen, ob schon eine Straße auf der Tile existiert
    if (tileContent[index] && React.isValidElement(tileContent[index]) && tileContent[index].type === Road) {
      return; // Keine Straße hinzufügen, wenn schon eine existiert
    }

    // Wenn der Start- oder Endpunkt auf dieser Tile ist, füge die Straße hinzu, ohne die Phrase zu löschen
    if (startingPoint === index || finishingPoint === index) {
      setTileContent((prev) => ({
        ...prev,
        [index]: (
          <>
            {prev[index]}
            <Road roadId={props.toggledOption.id} />
          </>
        ),
      }));
      return;
    }

    // Falls weder Start- noch Endpunkt auf dieser Tile sind, füge die Straße hinzu
    setTileContent((prev) => ({
      ...prev,
      [index]: <Road roadId={props.toggledOption.id} />,
    }));
  }

  // Hilfsfunktionen zum Setzen des Startpunkts
  function setStartingPointTile(index: number) {
    // Verhindern, dass der Startpunkt und Endpunkt auf derselben Tile liegen
    if (finishingPoint === index) {
      return; // Falls der Endpunkt bereits gesetzt ist, verhindere das Setzen des Startpunkts
    }

    // Wenn der Startpunkt bereits gesetzt wurde, verhindere das Setzen eines neuen
    if (startingPoint !== undefined) {
      return; // Nur einen Startpunkt zulassen
    }

    // Startpunkt setzen
    setTileContent((prev) => ({
      ...prev,
      [index]: appendPhrase(prev[index], "start"),
    }));
    setStartingPoint(index);
  }

  // Hilfsfunktionen zum Setzen des Endpunkts
  function setFinishingPointTile(index: number) {
    // Verhindern, dass der Startpunkt und Endpunkt auf derselben Tile liegen
    if (startingPoint === index) {
      return; // Falls der Startpunkt bereits gesetzt ist, verhindere das Setzen des Endpunkts
    }

    // Wenn der Endpunkt bereits gesetzt wurde, verhindere das Setzen eines neuen
    if (finishingPoint !== undefined) {
      return; // Nur einen Endpunkt zulassen
    }

    // Endpunkt setzen
    setTileContent((prev) => ({
      ...prev,
      [index]: appendPhrase(prev[index], "finish"),
    }));
    setFinishingPoint(index);
  }

  // Phrase zu bestehendem Inhalt hinzufügen
  function appendPhrase(content: React.ReactNode, phrase: string): React.ReactNode {
    const phraseElement = <p key={phrase}>{phrase}</p>;
    if (React.isValidElement(content)) {
      return (
        <>
          {content}
          {phraseElement}
        </>
      );
    }
    return phraseElement;
  }

  // Phrase aus bestehendem Inhalt entfernen
  function removePhrase(content: React.ReactNode, phrase: string): React.ReactNode {
    if (Array.isArray(content)) {
      return content.filter((child) => {
        if (React.isValidElement(child)) {
          const childElement = child as React.ReactElement;
          return !(childElement.type === "p" && childElement.props.children === phrase);
        }
        return true;
      });
    }

    if (React.isValidElement(content)) {
      const contentElement = content as React.ReactElement;
      if (contentElement.type === "p" && contentElement.props.children === phrase) {
        return null;
      }
    }

    return content;
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
          {tileContent[index] || index}
        </div>
      ))}
    </div>
  );
}
