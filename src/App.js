import { useEffect, useState } from "react";
import { fetchModes } from "./fetchModes";

function App() {
  const [modes, setModes] = useState([]);
  const [currentMode, setCurrentMode] = useState({
    name: 'none',
    field: 0,
  });
  const [fields, setFields] = useState([]);
  const [valueToStart, setValueToStart] = useState({
    name: 'none',
    field: 0,
  });

  useEffect(() => {
    fetchModes().then(mode => {
      const data = Object.keys(mode).map((e, i) => {
        return {
          name: e,
          field: mode[e].field,
        }
      })

      setModes(data)
    });
  }, [])

  const handleHover = (event) => {
    const item = event.target;
    const num = Number(item.dataset.item);
    const data = [...fields];

    data[num] = { fill: !data[num].fill }
    setFields(data)
  }

  const handleSelectMode = (event) => {
    const index = event.target.options.selectedIndex;
    const value = {
      name: index === 0 ? 'none' : modes[index - 1].name,
      field: index === 0 ? 0 : modes[index - 1].field,
    }

    setValueToStart(value)
  }

  const handleStart = () => {
    const fields = valueToStart.name !== 'none' ?
      Array(valueToStart.field * valueToStart.field).fill({ hover: false }) :
      [];

    setFields(fields);
    setCurrentMode(valueToStart);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Starnavi</h1>
        <div className="select-mode">
          <select onChange={handleSelectMode}>
            <option key="value-0" value="0">Pick mode</option>
            {modes.length > 0 && (
              modes.map((element, i) => <option value={element.name} key={i}>{element.name}</option>)
            )}
          </select>
          <button disabled={valueToStart.name !== 'none' ? false : 'disabled'} type="button" onClick={handleStart}>Start</button>
        </div>
        <div className="row">
          <div className={`items ${currentMode.name}`}>
            {fields.length > 0 && (
              fields.map((element, index) =>
                <div
                  key={`item-${index}`}
                  data-item={index}
                  onMouseEnter={handleHover}
                  className={`item ${element.fill === true ? 'hovered' : ''}`}>  
                </div>
              )
            )}
          </div>
          <div className="hover-text">
            {fields.length > 0 && (
              fields.filter(e => e.fill).map((element, index) =>
                <span key={`span-${index}`}>
                  {`row-${Math.trunc(index / currentMode.field) + 1} col-${(index + 1) % currentMode.field}`}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
