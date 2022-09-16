import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../action/index";

export const Empty = ({ c_i, r_i }) => {
  const [moveFlag, setMoveFlag] = useState(false);
  const [style, setStyle] = useState({});

  const selectedClmn = useSelector((state) => state.game.selectedClmn);
  const selectedRow = useSelector((state) => state.game.selectedRow);
  const moveArray = useSelector((state) => state.game.moveArray);

  const selectedStone = useSelector((state) => state.game.selectedStone);
  const dispatch = useDispatch();

  useEffect(() => {
    if (moveArray[r_i][c_i] == -1) {
      setMoveFlag(true);

      setStyle({
        borderRadius: "0",
        border: "solid",
        borderColor: "green",
        borderWidth: "3px",
        width: "80%",
        height: "80%",
      });
    } else {
      setMoveFlag(false);
      setStyle({});
    }
  }, [selectedClmn, selectedRow, selectedStone]);

  const onClick = () => {
    if (selectedStone != 0 && moveFlag == true) {
      var flag = false;

      if (r_i < 6 && r_i > 1 && c_i == selectedClmn) {
        if (r_i > selectedRow && moveArray[r_i + 2][c_i] == -1) {
          flag = true;
        } else if (r_i < selectedRow && moveArray[r_i - 2][c_i] == -1) {
          flag = true;
        }
      } else if (c_i < 6 && c_i > 1 &&  r_i == selectedRow) {
        if (c_i > selectedClmn && moveArray[r_i][c_i + 2] == -1) {
          flag = true;
        } else if (c_i < selectedClmn && moveArray[r_i][c_i - 2] == -1) {
          flag = true;
        }
      }

      action.move(r_i, c_i, flag, dispatch);
      if (flag == true) {
        action.select(r_i, c_i, dispatch);
      }
      setStyle({});
    }
  };

  return <div style={style} onClick={onClick} className="checkersPiece"></div>;
};
