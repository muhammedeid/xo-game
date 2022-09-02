import React, { useContext } from "react";
import Xicon from "../Icons/Xicon";
import Oicon from "../Icons/Oicon";
import { gameContext } from "../../Context/gameContext";

const BoardCard = ({ user, active, index }) => {
  const { squareClickHandler } = useContext(gameContext);

  return (
    <div
      className={`
    card
     ${active && user === "x" && "shadow-blue"}
      ${active && user === "o" && "shadow-yellow"} 
     ${active ? "active" : "shadow-gray"}
    `}
      onClick={() => squareClickHandler(index)}
    >
      {user === "x" && <Xicon size="lg" color={active && "dark"} />}
      {user === "o" && <Oicon size="lg" color={active && "dark"} />}
    </div>
  );
};

export default BoardCard;
