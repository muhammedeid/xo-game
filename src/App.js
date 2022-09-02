import React, { useContext } from "react";
import "./Assets/style.css";
import Start from "./Components/Start/Start";
import Board from "./Components/Board/Board";
import Model from "./Components/Model/Model";
import { gameContext } from "./Context/gameContext";

function App() {
  const { screen } = useContext(gameContext);
  return (
    <React.Fragment>
      <div className="app">
        <div className="container">
          {screen === "start" && <Start />}
          {screen === "board" && <Board />}
          <Model />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
