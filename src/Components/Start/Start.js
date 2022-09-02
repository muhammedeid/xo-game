import React, { useContext } from "react";
import Xicon from "../Icons/Xicon";
import Oicon from "../Icons/Oicon";
import { gameContext } from "../../Context/gameContext";

const Start = () => {
  const { activeUser, setActiveUser, newGameBtn } = useContext(gameContext);
  return (
    <div className="start">
      {/* HEADER */}
      <header>
        <Xicon />
        <Oicon />
      </header>

      {/* PLAYYERS CARD */}
      <div className="card shadow-gray">
        <h1 className="text-lg">Pick Player 1's Mark</h1>
        <div className="players">
          <span
            className={activeUser === "x" ? "player-active" : ""}
            onClick={() => setActiveUser("x")}
          >
            <Xicon color={activeUser === "x" ? "dark" : "light"} />
          </span>
          <span
            className={activeUser === "o" ? "player-active" : ""}
            onClick={() => setActiveUser("o")}
          >
            <Oicon color={activeUser === "o" ? "dark" : "light"} />
          </span>
        </div>
        <p className="text-light">Remember : x goes first</p>
      </div>

      {/* BUTTONS */}
      <div className="btns">
        <button className="btn btn-yellow" onClick={() => newGameBtn("pc")}>
          New Game ( V.S PC )
        </button>
        <button className="btn btn-blue" onClick={() => newGameBtn("user")}>
          New Game ( V.S Player )
        </button>
      </div>
    </div>
  );
};

export default Start;
