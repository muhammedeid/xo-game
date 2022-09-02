import React, { useContext } from "react";
import Xicon from "../Icons/Xicon";
import Oicon from "../Icons/Oicon";
import { gameContext } from "../../Context/gameContext";

const Win = () => {
  const { winner, activeUser, playMode, nextRound, quitGame } =
    useContext(gameContext);

  return (
    <div className="win">
      {winner === "no" ? (
        <h1 className="text-blue no-winner">
          No <span className="text-yellow">Winner</span>
        </h1>
      ) : (
        <>
          <h1 className="">
            {activeUser === winner && playMode === "pc" && "You Won!"}
            {activeUser !== winner && playMode === "pc" && "PC Won!"}
            {playMode === "user" && `Player ${winner} Won!`}
          </h1>
          <h2>
            {winner === "x" ? <Xicon /> : <Oicon />}

            <div className={winner === "x" ? "text-blue" : "text-yellow"}>
              Takes the round
            </div>
          </h2>
        </>
      )}
      <div className="btns">
        <button className="btn" onClick={quitGame}>
          Quit
        </button>
        <button className="btn btn-yellow" onClick={nextRound}>
          Next Round
        </button>
      </div>
    </div>
  );
};

export default Win;
