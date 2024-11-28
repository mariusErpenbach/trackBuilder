import { useState } from "react";

export default function Road(props: { roadId: string }) {
    const [direction,setDirection] = useState<number>(0);
    const directions=["⬆️","➡️","⬇️","⬅️"]

    const changeDirection = () => {
        if(direction == 3 ){
            setDirection(0)
        }else{setDirection(direction+1)}
    }
    const roads: Record<string, () => JSX.Element> = {
        road000: function() {
            return (
                // <div className="road000">
                //     <div className="north000">&nbsp;</div>
                //     <div className="south000">&nbsp;</div>
                //     <div className="east000">&nbsp;</div>
                //     <div className="west000">&nbsp;</div>
                //     <div className="core000">&nbsp;</div>
                // </div>
                <div className="road000s" onClick={changeDirection}>
                    {directions[direction]}
                </div>
            );
        },
        road001: function() {
            return (
                <div>
                    <p>Road 001</p>
                </div>
            );
        },
    };

    // Funktion basierend auf props.roadId abrufen, falls vorhanden
    const SelectedRoad = roads[props.roadId];

    return (
        <div className="road">
            {SelectedRoad ? SelectedRoad() : ""}
        </div>
    );
}
