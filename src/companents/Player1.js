import React from "react";
import { useSelector } from "react-redux";

export const Player1 = () => {
  const count1 = useSelector((state) => state.game.count1);
  return (
    <div className="player">
      <div
        style={{
          width: "90%",
          height: "99%",
          background: "rgb(248, 214, 163)",
          margin: "auto",
          borderRadius: "5px",
        }}
      >
        {[...Array(count1)].map((elementInArray, index) => (
          <div>
            <img
              style={{
                position: "absolute",
                paddingLeft: "4px",
                paddingTop: `${40*index}px`,
              }}
              src={"1.png"}
              width={"3%"}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};
