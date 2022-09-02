import React, { useContext } from "react";
import Xicon from "../Icons/Xicon";
import Oicon from "../Icons/Oicon";
import RestIcon from "../Icons/Restart";
import BoardCard from "./BoardCard";
import { modelContext } from "../../Context/modelContext";
import { gameContext } from "../../Context/gameContext";

const Board = () => {
  const { restartIcon } = useContext(modelContext);
  const {
    squares,
    nextX,
    activeLine,
    ties,
    playMode,
    activeUser,
    noWinnerMatches,
  } = useContext(gameContext);
  return (
    <div className="board">
      <header>
        <div className="logo">
          <Xicon />
          <Oicon />
        </div>
        <div className="turn">
          {nextX ? (
            <Oicon color="light" size="sm" />
          ) : (
            <Xicon color="light" size="sm" />
          )}
          <span className="text-lg">Turn</span>
        </div>
        <button className="btn btn-sm restart" onClick={restartIcon}>
          <RestIcon size="sm" />
        </button>
      </header>
      <main>
        {squares.map((sq, ix) => (
          <BoardCard
            key={ix}
            user={sq}
            index={ix}
            active={activeLine.includes(ix)}
          />
        ))}
      </main>
      <footer>
        <div className={activeUser === "x" ? "card bg-blue" : "card bg-yellow"}>
          <p>
            {activeUser === "x" && playMode === "pc" && "X (you)"}
            {activeUser === "o" && playMode === "pc" && "O (you)"}
            {activeUser === "x" && playMode === "user" && "(player X)"}
            {activeUser === "o" && playMode === "user" && "(player O)"}
          </p>
          <strong className="text-2xl">
            {activeUser === "x" ? ties.x : ties.o}
          </strong>
        </div>
        <div className="card bg-light">
          <p>Ties</p>
          <strong className="text-2xl">
            {ties.x + ties.o + noWinnerMatches}
          </strong>
        </div>
        <div className={activeUser === "x" ? "card bg-yellow" : "card bg-blue"}>
          <p>
            {activeUser === "x" && playMode === "pc" && "O (pc)"}
            {activeUser === "o" && playMode === "pc" && "X (pc)"}
            {activeUser === "x" && playMode === "user" && "(player O)"}
            {activeUser === "o" && playMode === "user" && "(player X)"}
          </p>
          <strong className="text-2xl">
            {activeUser === "x" ? ties.o : ties.x}
          </strong>
        </div>
      </footer>
    </div>
  );
};

export default Board;
