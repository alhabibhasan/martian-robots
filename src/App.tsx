import React, { useRef, useState } from "react";
import "./App.css";
import { IRunner, RoverRunner } from "./libs";

function App() {
  const roverRunner = useRef<IRunner>(new RoverRunner());
  const [cmds, setCmds] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="App">
      <label htmlFor="cmds">Input robot commands</label>
      <p>
        <small>Don't forget the line breaks!</small>
      </p>
      <p>
        <textarea
          id="cmds"
          value={cmds}
          onChange={(e) => setCmds(e.target.value)}
        />
        <button
          onClick={() => {
            if (cmds.length > 0) {
              const result = roverRunner.current.solve(cmds);
              setOutput(result);
            }
          }}
        >
          Run
        </button>
      </p>
      <div>
        <p>Output:</p>
        <div style={{ whiteSpace: "pre-line" }}>{output}</div>
      </div>
    </div>
  );
}

export default App;
