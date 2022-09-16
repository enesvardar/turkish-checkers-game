import React from "react";
import { useSelector } from "react-redux";
import { CheckersPiece } from "./CheckersPiece.js";
import { Empty } from "./Empty.js";

export const Box = ({ c_i, r_i, color, type = { type } }) => {
  return (
    <div className="box" style={{ backgroundColor: color }}>
      {type != 0 ? (
        <CheckersPiece c_i={c_i} r_i={r_i} type={type} />
      ) : (
        <Empty c_i={c_i} r_i={r_i} />
      )}
    </div>
  );
};
