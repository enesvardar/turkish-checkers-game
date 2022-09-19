import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../action/index";

export const CheckersPiece = ({ c_i, r_i, type }) => {
  const selectedClmn = useSelector((state) => state.game.selectedClmn);
  const selectedRow = useSelector((state) => state.game.selectedRow);
  const game = useSelector((state) => state.game);
  const elementArray = useSelector((state) => state.game.elementArray);

  
  /* taşın tipine göre resim seçiliyor */
  const src =
    type == 1
      ? "1.png"
      : type == 11
      ? "1K.png"
      : type == 2
      ? "2.png"
      : "2K.png";

  const dispatch = useDispatch();

  const onClick = () => {
    var flag = false;
    
    /*  
      Eğer zaten seçili bir taş var ve seçili taşın yiyebileceği karşı bir taş var ise, tekrar taş seçimine izin verilmiyor
    */
    if (game.selectedStone == 1) {
      if (
        elementArray[selectedRow + 1][selectedClmn] == 2 &&
        elementArray[selectedRow + 2][selectedClmn] == 0
      ) {
        flag = true;
      }

      if (
        elementArray[selectedRow][selectedClmn + 1] == 2 &&
        elementArray[selectedRow][selectedClmn + 2] == 0
      ) {
        flag = true;
      }

      if (
        elementArray[selectedRow][selectedClmn - 1] == 2 &&
        elementArray[selectedRow][selectedClmn - 2] == 0
      ) {
        flag = true;
      }
    } else if (game.selectedStone == 2) {
      if (
        elementArray[selectedRow - 1][selectedClmn] == 1 &&
        elementArray[selectedRow - 2][selectedClmn] == 0
      ) {
        flag = true;
      }

      if (
        elementArray[selectedRow][selectedClmn + 1] == 1 &&
        elementArray[selectedRow][selectedClmn + 2] == 0
      ) {
        flag = true;
      }

      if (
        elementArray[selectedRow][selectedClmn - 1] == 1 &&
        elementArray[selectedRow][selectedClmn - 2] == 0
      ) {
        flag = true;
      }
    }

    if (flag == false) {
      if (
        type != 0 &&
        ((game.player == 1 && (type == 1 || type == 11)) ||
          (game.player == 2 && (type == 2 || type == 22))) &&
        game.continue == false
      ) {
        action.select(r_i, c_i, dispatch);
      }
    }
  };

  return (
    <div
      onClick={onClick}
      className="checkersPiece"
      style={{
        backgroundColor: type != 0 ? "white" : "",
        width: selectedRow == r_i && selectedClmn == c_i ? "70%" : "60%",
      }}
    >
      <img style={{ border: "50px" }} src={src} width={"120%"}></img>
    </div>
  );
};
