import React from "react";
import { useSelector } from "react-redux";

export const Header = () => {
  const game = useSelector((state) => state.game);

  const player = game.player;

  return (
    <div className="header">
      <div>Player</div>
      <img
        style={{ border: "50px", paddingLeft: "10px" }}
        src={player == 1 ? "1.png" : "2.png"}
        width={"5%"}
        height={"80%"}
      ></img>
    </div>
  );
};
