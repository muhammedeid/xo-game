import React, { useContext } from "react";
import { modelContext } from "../../Context/modelContext";
import { gameContext } from "../../Context/gameContext";

const Restart = () => {
  const { hideModel } = useContext(modelContext);
  const { quitGame } = useContext(gameContext);

  return (
    <div className="restart-popup">
      <h1>Restart game ?</h1>
      <div className="btns">
        <button className="btn" onClick={hideModel}>
          No, Cancel
        </button>
        <button
          className="btn btn-yellow"
          onClick={quitGame}
        >
          Yes, Restart
        </button>
      </div>
    </div>
  );
};

export default Restart;
