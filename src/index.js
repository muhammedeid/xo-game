import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModelState } from "./Context/modelContext";
import { GameState } from "./Context/gameContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModelState>
      <GameState>
        <App />
      </GameState>
    </ModelState>
  </React.StrictMode>
);
