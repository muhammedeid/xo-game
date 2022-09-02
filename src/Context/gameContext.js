import { createContext, useContext, useEffect, useState } from "react";
import { modelContext } from "./modelContext";

const gameContext = createContext();

const GameState = (props) => {
  //  Contexts
  const { showModel, hideModel, setModelMode } = useContext(modelContext);

  //  States
  const [screen, setScreen] = useState("start"); // start || board
  const [activeUser, setActiveUser] = useState("x"); // x || o
  const [playMode, setPlayMode] = useState("user"); // user || pc
  const [squares, setSquares] = useState(new Array(9).fill("")); // ["x","o",...]
  const [nextX, setNextX] = useState(false); // boolean
  const [winner, setWinner] = useState(null); // x || o
  const [activeLine, setActiveLine] = useState([]); // [ a , b , c ]
  const [ties, setTies] = useState({ x: 0, o: 0 }); // { x , y }
  const [noWinnerMatches, setNoWinnerMatches] = useState(0); // number

  // Options
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Effets
  useEffect(() => {
    // Check No Winner
    checkNoWinner();

    // PC Mode
    pcMode();
  }, [nextX, winner, ties, activeUser]);

  // Functions
  const newGameBtn = (mode) => {
    setScreen("board");
    setPlayMode(mode);
  };

  const squareClickHandler = (ix) => {
    const currentUser = nextX ? "o" : "x";
    const newSquares = [...squares];
    // Player Mode
    if (newSquares[ix] === "") {
      newSquares[ix] = currentUser;
      setSquares(newSquares);
      setNextX(!nextX);
    }
    // Check Winner
    displayWinner(newSquares);
  };

  const checkWinner = (newSquares) => {
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        newSquares[a] !== "" &&
        newSquares[a] === newSquares[b] &&
        newSquares[b] === newSquares[c]
      ) {
        return {
          winner: newSquares[a],
          line: line,
        };
      }
    }
    return null;
  };

  const displayWinner = (newSquares) => {
    const isWinner = checkWinner(newSquares);
    if (isWinner) {
      setWinner(isWinner.winner);
      setActiveLine(isWinner.line);
      setModelMode("winner");
      setTimeout(() => showModel(), 1000);
      const newTies = {
        x: ties.x + (isWinner.winner === "x" ? 1 : 0),
        o: ties.o + (isWinner.winner === "o" ? 1 : 0),
      };
      setTies(newTies);
    }
  };

  const checkNoWinner = () => {
    const isFull = squares.every((sq) => sq !== "");
    if (isFull && winner == null) {
      setNoWinnerMatches((prev) => prev + 1);
      setWinner("no");
      setModelMode("winner");
      setTimeout(() => showModel(), 1000);
    }
  };

  const quitGame = () => {
    setActiveUser("x");
    setSquares(new Array(9).fill(""));
    setNextX("x");
    setWinner(null);
    setActiveLine([]);
    setTies({ x: 0, o: 0 });
    hideModel();
    setNoWinnerMatches(0);
    setScreen("start");
  };

  const nextRound = () => {
    setSquares(new Array(9).fill(""));
    setNextX(winner === "x");
    setActiveLine([]);
    setWinner(null);
    hideModel();
  };

  // Easy Mode
  const rndEmptyIndex = (newSquares = []) => {
    const emptyIx = [];
    newSquares.forEach((sq, ix) => {
      if (sq === "") emptyIx.push(ix);
    });
    return emptyIx[Math.floor(Math.random() * emptyIx.length)];
  };

  // Normal Mode
  const calcBestMove = (squares = [], player = "") => {
    const getDuplicatedCount = (line) => {
      let count = 0;
      line.forEach((i) => {
        squares[i] === player && count++;
      });
      return count;
    };

    const sortedLines = lines.sort((a, b) => {
      const acount = getDuplicatedCount(a);
      const bcount = getDuplicatedCount(b);
      return bcount - acount;
    });

    for (let i = 0; i < sortedLines.length; i++) {
      let val = sortedLines[i].find((el) => {
        if (squares[el] === "") return String(el);
        else return null;
      });
      if (val) return +val;
      else continue;
    }
  };

  const pcMode = () => {
    const currentUser = nextX ? "o" : "x";
    if (playMode === "pc" && activeUser !== currentUser && winner == null) {
      const ns = [...squares];
      ns[calcBestMove(ns, currentUser)] = !nextX ? "x" : "o";
      setSquares(ns);
      setNextX(!nextX);
      // Check Winner
      displayWinner(ns);
    }
  };

  return (
    <gameContext.Provider
      value={{
        screen,
        activeUser,
        playMode,
        squares,
        winner,
        activeLine,
        ties,
        nextX,
        noWinnerMatches,
        setScreen,
        setActiveUser,
        newGameBtn,
        squareClickHandler,
        nextRound,
        quitGame,
      }}
    >
      {props.children}
    </gameContext.Provider>
  );
};

export { gameContext, GameState };
