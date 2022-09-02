import React, { createContext, useState } from "react";

const modelContext = createContext();

const ModelState = (props) => {
  // States
  const [show, setShow] = useState(false);
  const [modelMode, setModelMode] = useState("winner");

  // Functions
  const showModel = () => setShow(true);
  const hideModel = () => setShow(false);
  const restartIcon = () => {
    setModelMode("restart");
    setShow(true);
  }

  return (
    <modelContext.Provider
      value={{
        modelMode,
        setModelMode,
        show,
        showModel,
        hideModel,
        restartIcon
      }}
    >
      {props.children}
    </modelContext.Provider>
  );
};

export { modelContext, ModelState };
