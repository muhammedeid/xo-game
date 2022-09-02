import React, { useContext } from "react";
import Win from "./Win";
import Restart from "./Restart";
import { modelContext } from "../../Context/modelContext";


const Model = () => {
  const { show, modelMode } = useContext(modelContext);


  return (
    <>
      {show && (
        <div className="model">
          <div className="content">
            <div className="container">
              {modelMode === "winner" && <Win />}
              {modelMode === "restart" && <Restart />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
