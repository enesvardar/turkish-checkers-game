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
  const elementArray = useSelector((state) => state.game.elementArray);
  const eating = useSelector((state) => state.game.eating);

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
    /* Bir taş hareket ettirildikten sonra, ilgili taş herhangi bir taşı yemiş ise,
    tekrar yiyebileceği bir taş var ise, ilgili taş tekrar seçiliyor.
    */
    if (selectedStone != 0 && moveFlag == true) {
      var flag = false;

      if (
        elementArray[selectedRow][selectedClmn] == 1 &&
        (Math.abs(selectedRow - r_i) >= 2 || Math.abs(selectedClmn - c_i) >= 2)
      ) {
        if (
          r_i < 6 &&
          elementArray[r_i + 1][c_i] == 2 &&
          elementArray[r_i + 2][c_i] == 0
        ) {
          flag = true;
        }

        if (
          c_i < 6 &&
          elementArray[r_i][c_i + 1] == 2 &&
          elementArray[r_i][c_i + 2] == 0
        ) {
          flag = true;
        }

        if (
          c_i > 2 &&
          elementArray[r_i][c_i - 1] == 2 &&
          elementArray[r_i][c_i - 2] == 0
        ) {
          flag = true;
        }
      } else if (
        elementArray[selectedRow][selectedClmn] == 2 &&
        (Math.abs(selectedRow - r_i) >= 2 || Math.abs(selectedClmn - c_i) >= 2)
      ) {
        if (
          r_i > 1 &&
          elementArray[r_i - 1][c_i] == 1 &&
          elementArray[r_i - 2][c_i] == 0
        ) {
          flag = true;
        }

        if (
          c_i < 6 &&
          elementArray[r_i][c_i + 1] == 1 &&
          elementArray[r_i][c_i + 2] == 0
        ) {
          flag = true;
        }

        if (
          c_i > 2 &&
          elementArray[r_i][c_i - 1] == 1 &&
          elementArray[r_i][c_i - 2] == 0
        ) {
          flag = true;
        }
      } else if (
        elementArray[selectedRow][selectedClmn] == 11 &&
        (Math.abs(selectedRow - r_i) >= 2 || Math.abs(selectedClmn - c_i) >= 2)
      ) {
        if (r_i < selectedRow) {
          if (
            r_i > 1 &&
            elementArray[r_i - 1][c_i] == 2 &&
            elementArray[r_i - 2][c_i] == 0
          ) {
            flag = true;
          }
        } else {
          if (
            r_i < 6 &&
            elementArray[r_i + 1][c_i] == 2 &&
            elementArray[r_i + 2][c_i] == 0
          ) {
            flag = true;
          }
        }

        if (
          c_i < 6 &&
          elementArray[r_i][c_i + 1] == 2 &&
          elementArray[r_i][c_i + 2] == 0 &&
          c_i > selectedClmn
        ) {
          flag = true;
        }

        if (
          c_i > 2 &&
          elementArray[r_i][c_i - 1] == 2 &&
          elementArray[r_i][c_i - 2] == 0 &&
          c_i < selectedClmn
        ) {
          flag = true;
        }
      } else if (
        elementArray[selectedRow][selectedClmn] == 22 &&
        (Math.abs(selectedRow - r_i) >= 2 || Math.abs(selectedClmn - c_i) >= 2)
      ) {
        if (r_i < selectedRow) {
          if (
            r_i > 1 &&
            elementArray[r_i - 1][c_i] == 1 &&
            elementArray[r_i - 2][c_i] == 0
          ) {
            flag = true;
          }
        } else {
          if (
            r_i < 6 &&
            elementArray[r_i + 1][c_i] == 1 &&
            elementArray[r_i + 2][c_i] == 0
          ) {
            flag = true;
          }
        }

        if (
          c_i < 6 &&
          elementArray[r_i][c_i + 1] == 1 &&
          elementArray[r_i][c_i + 2] == 0 &&
          c_i > selectedClmn
        ) {
          flag = true;
        }

        if (
          c_i > 2 &&
          elementArray[r_i][c_i - 1] == 1 &&
          elementArray[r_i][c_i - 2] == 0 &&
          c_i < selectedClmn
        ) {
          flag = true;
        }
      }

      action.move(r_i, c_i, flag, dispatch);

      if (flag == true) {

        /* Eğer ilgili taş kral durumunda ise daha önce bir taş yeme durumuna bakılıyor
          Kral değilse 2 birimlik bir hareketi, bir eleman yemiş anlamındadır.
        */
        if (
          elementArray[selectedRow][selectedClmn] == 11 ||
          elementArray[selectedRow][selectedClmn] == 22
        ) {
          if (eating == true) {
            action.select(r_i, c_i, dispatch);
          }
        } else {
          action.select(r_i, c_i, dispatch);
        }
      }

      setStyle({});
    }
  };

  return <div style={style} onClick={onClick} className="checkersPiece"></div>;
};
