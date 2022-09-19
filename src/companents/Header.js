import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../action/index";

export const Header = () => {
  const game = useSelector((state) => state.game);

  const player = game.player;
  const elementArray = game.elementArray;
  const dispatch = useDispatch();

  useEffect(() => {

    /* Oyun sırası değiştiğinde, sıra geçen oyuncudaki varsa, yeme durumunda olan taş seçiliyor*/

    var flag = false; /* yeme durumunda olan bir taşın durmunu bildiren flag*/ 
    /* yeme durumunda olan taşın column ve row bilgileri*/
    var br_i = 0; 
    var bc_i = 0;

    for (let r_i = 0; r_i < 8; r_i++) {
      if (flag == true) {
        break;
      }

      for (let c_i = 0; c_i < 8; c_i++) {
        if (elementArray[r_i][c_i] == 1 && player == 1) {
          if (
            (elementArray[r_i + 1][c_i] == 2 ||
              elementArray[r_i + 1][c_i] == 22) &&
            elementArray[r_i + 2][c_i] == 0
          ) {
            flag = true;
            br_i = r_i;
            bc_i = c_i;
            break;
          }

          if (
            (elementArray[r_i][c_i + 1] == 2 ||
              elementArray[r_i][c_i + 1] == 22) &&
            elementArray[r_i][c_i + 2] == 0
          ) {
            flag = true;
            br_i = r_i;
            bc_i = c_i;
            break;
          }

          if (
            (elementArray[r_i][c_i - 1] == 2 ||
              elementArray[r_i][c_i - 1] == 22) &&
            elementArray[r_i][c_i - 2] == 0
          ) {
            flag = true;
            br_i = r_i;
            bc_i = c_i;
            break;
          }
        } else if (elementArray[r_i][c_i] == 2 && player == 2) {
          if (
            (elementArray[r_i - 1][c_i] == 1 ||
              elementArray[r_i - 1][c_i] == 11) &&
            elementArray[r_i - 2][c_i] == 0
          ) {
            flag = true;
            br_i = r_i;
            bc_i = c_i;
            break;
          }

          if (
            (elementArray[r_i][c_i + 1] == 1 ||
              elementArray[r_i][c_i + 1] == 11) &&
            elementArray[r_i][c_i + 2] == 0
          ) {
            flag = true;
            br_i = r_i;
            bc_i = c_i;
            break;
          }

          if (
            (elementArray[r_i][c_i - 1] == 1 ||
              elementArray[r_i][c_i - 1] == 11) &&
            elementArray[r_i][c_i - 2] == 0
          ) {
            flag = true;
            br_i = r_i;
            bc_i = c_i;
            break;
          }
        } else if (elementArray[r_i][c_i] == 11) {
        } else if (elementArray[r_i][c_i] == 22) {
        }
      }
    }

    /* eğer ilgili flag true ise yeme durumunda olan taş kullanıcıya bırakılmadan seçiliyor*/
    if (flag == true) {
      action.select(br_i, bc_i, dispatch);
    }
  }, [player]);

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
