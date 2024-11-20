import { useEffect,useState } from "react"

export default function MapEditorMenu(props:any) {
const [selectedOption, setSelectedOption] = useState<Array<string>>(["",""])
  
function selectOption (e:any){
  let selectedElement = document.getElementById(e.target.id)
  if(selectedOption[0]!==e.target.id){ // user clicked a new option to select.
    const oldOption = document.getElementById(selectedOption[0])// delete highlight effect on old element
    if(oldOption){oldOption.className = selectedOption[1]}
    props.toggleOption(e.target.id) // pass the selected option to the page component.
    setSelectedOption([e.target.id, e.target.className]) // safe the selected option in a local state.
    selectedElement? selectedElement.className += " selected":console.log("no element with clicked id") // highlight clicked element  
    
  } else { // user clicked an selected option again -> untoggle the option.
    selectedElement? selectedElement.className = selectedOption[1]:""
    setSelectedOption(["",""]);
    props.untoggleOption();
  }
 
}
    return <div id="mapEditorMenu">
      <h3>Roads</h3>
      <div id="roadBox">
          <div className="roadOption" id="road-000" onClick={selectOption}>
          ⬆️ 
          </div> 
      </div>
      <div id="optionBox">
          <div className="editorOption" id="deleteOption" onClick={selectOption}> 
          🧽
          </div>
      </div>

          </div>
}