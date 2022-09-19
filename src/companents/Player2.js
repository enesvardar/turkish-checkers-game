import React from "react";
import { useSelector } from "react-redux";

export const Player2 = () => {
  /* Bu kompanentde 2. oyuncunun yediği taşlar gösteriliyor */
  const count2 = useSelector((state) => state.game.count2);
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
        {[...Array(count2)].map((elementInArray, index) => (
          <div key={index}>
            <img
              style={{
                position: "absolute",
                paddingLeft: "4px",
                paddingTop: `${40*index}px`,
              }}
              src={"2.png"}
              width={"3%"}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};