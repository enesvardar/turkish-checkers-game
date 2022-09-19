const initialValue = {
  player: 1,

  /*  Tahta üzerindeki elemanları tutan aray 
      1: kahverengi
      2: beyaz
      11: kahverengi kral
      22: beyaz kral 
  */
  elementArray: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],

  moveArray: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],

  /* Seçili taşın column ve row numaralrını tutar */
  selectedClmn: -1,
  selectedRow: -1,
  /* Seçili taşın tipi tutan değişken */
  selectedStone: 0,

  continue: false,

  /* Bir taş yeme durumunu tutan bayrak*/
  eating: false,

  /* Eksilen taşları tutan sayıcılar*/
  count1: 0,
  count2: 0,
};

const gameReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "SELECT":
      if (
        state.selectedClmn == action.column &&
        state.selectedRow == action.row
      ) {
        const moveArray = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        return {
          ...state,
          selectedClmn: -1,
          selectedRow: -1,
          moveArray: moveArray,
        };
      } else {
        const moveArray = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        const elementArray = state.elementArray;
        const row = action.row;
        const clm = action.column;

        var fCnt = 0;
        var UCnt = 0;
        var lCnt = 0;
        var rCnt = 0;
        var type = 0;

        if (state.player == 1 && elementArray[row][clm] == 1) {
          if (
            (elementArray[row + 1][clm] == 2 || elementArray[row + 1][clm] == 22) &&
            elementArray[row + 2][clm] == 0
          ) {
            moveArray[row + 2][clm] = -1;
            fCnt++;
          } else if (elementArray[row + 1][clm] == 0) {
            moveArray[row + 1][clm] = -1;
          }

          if (
            (elementArray[row][clm + 1] == 2 || elementArray[row][clm + 1] == 22) &&
            elementArray[row][clm + 2] == 0
          ) {
            moveArray[row][clm + 2] = -1;
            rCnt++;
          } else if (elementArray[row][clm + 1] == 0) {
            moveArray[row][clm + 1] = -1;
          }

          if (
            (elementArray[row][clm - 1] == 2 || elementArray[row][clm - 1] == 22) &&
            elementArray[row][clm - 2] == 0
          ) {
            moveArray[row][clm - 2] = -1;
            lCnt++;
          } else if (elementArray[row][clm - 1] == 0) {
            moveArray[row][clm - 1] = -1;
          }
        }

        if (state.player == 2 && elementArray[row][clm] == 2) {
          if (
            (elementArray[row - 1][clm] == 1 || elementArray[row - 1][clm] == 11) &&
            elementArray[row - 2][clm] == 0
          ) {
            moveArray[row - 2][clm] = -1;
            fCnt++;
          } else if (elementArray[row - 1][clm] == 0) {
            moveArray[row - 1][clm] = -1;
          }

          if (
            (elementArray[row][clm + 1] == 1 || elementArray[row][clm + 1] == 11) &&
            elementArray[row][clm + 2] == 0
          ) {
            moveArray[row][clm + 2] = -1;
            rCnt++;
          } else if (elementArray[row][clm + 1] == 0) {
            moveArray[row][clm + 1] = -1;
          }

          if (
            (elementArray[row][clm - 1] == 1 || elementArray[row][clm - 1] == 11)&&
            elementArray[row][clm - 2] == 0
          ) {
            moveArray[row][clm - 2] = -1;
            lCnt++;
          } else if (elementArray[row][clm - 1] == 0) {
            moveArray[row][clm - 1] = -1;
          }
        }

        if (
          (state.player == 1 && elementArray[row][clm] == 11) ||
          (state.player == 2 && elementArray[row][clm] == 22)
        ) {
          var type1 = 0
          var type2 = 0

          if (state.player == 1) {
            type1 = 2;
            type2 = 22;
          } else {
            type1 = 1;
            type2 = 11;
          }

          for (let c_i = clm; c_i >= 1; c_i = c_i - 1) {
            if (elementArray[row][c_i - 1] == 0) {
              moveArray[row][c_i - 1] = -1;
            } else if (
              (elementArray[row][c_i - 1] == type1 || elementArray[row][c_i - 1] == type2) &&
              elementArray[row][c_i - 2] == 0
            ) {
              moveArray[row][c_i - 2] = -1;
              lCnt = lCnt + 1;
              break;
            } else {
              break;
            }
          }

          for (let c_i = clm; c_i <= 6; c_i = c_i + 1) {
            if (elementArray[row][c_i + 1] == 0) {
              moveArray[row][c_i + 1] = -1;
            } else if (
              (elementArray[row][c_i + 1] == type1 || elementArray[row][c_i + 1] == type2) &&
              elementArray[row][c_i + 2] == 0
            ) {
              moveArray[row][c_i + 2] = -1;
              rCnt = rCnt + 1;
              break;
            } else {
              break;
            }
          }

          for (let r_i = row; r_i <= 6; r_i = r_i + 1) {
            if (elementArray[r_i + 1][clm] == 0) {
              moveArray[r_i + 1][clm] = -1;
            } else if (
              (elementArray[r_i + 1][clm] == type1 || elementArray[r_i + 1][clm] == type2 ) &&
              elementArray[r_i + 2][clm] == 0
            ) {
              moveArray[r_i + 2][clm] = -1;
              fCnt = fCnt + 1;
              break;
            } else {
              break;
            }
          }

          for (let r_i = row; r_i >= 1; r_i = r_i - 1) {
            if (elementArray[r_i - 1][clm] == 0) {
              moveArray[r_i - 1][clm] = -1;
            } else if (
              (elementArray[r_i - 1][clm] == type1 || elementArray[r_i - 1][clm] == type2) &&
              elementArray[r_i - 2][clm] == 0
            ) {
              moveArray[r_i - 2][clm] = -1;
              UCnt = UCnt + 1;
              break;
            } else {
              break;
            }
          }
        }

        if (
          (state.player == 1 && elementArray[row][clm] == 11) ||
          (state.player == 2 && elementArray[row][clm] == 22)
        ) {


          if (lCnt == 0 && (rCnt > 0 || fCnt > 0 || UCnt > 0)) {
            for (let c_i = 0; c_i < clm; c_i = c_i + 1) {
              moveArray[row][c_i] = 0;
            }
          }

          if (rCnt == 0 && (lCnt > 0 || fCnt > 0 || UCnt > 0)) {
            for (let c_i = 7; c_i > clm; c_i = c_i - 1) {
              moveArray[row][c_i] = 0;
            }
          }

          if (fCnt == 0 && (lCnt > 0 || rCnt > 0 || UCnt > 0)) {
            for (let r_i = 7; r_i > row; r_i = r_i - 1) {
              moveArray[r_i][clm] = 0;
            }
          }

          if (UCnt == 0 && (lCnt > 0 || rCnt > 0 || fCnt > 0)) {
            for (let r_i = 0; r_i < row; r_i = r_i + 1) {
              moveArray[r_i][clm] = 0;
            }
          }

        } else {
          if (fCnt == 0 && (rCnt > 0 || lCnt > 0)) {
            if (type == 2) {
              moveArray[row + 1][clm] = 0;
            } else {
              moveArray[row - 1][clm] = 0;
            }
          }

          if (lCnt == 0 && (rCnt > 0 || fCnt > 0)) {
            moveArray[row][clm + 1] = 0;
          }

          if (rCnt == 0 && (lCnt > 0 || fCnt > 0)) {
            moveArray[row][clm - 1] = 0;
          }
        }

        return {
          ...state,
          selectedClmn: action.column,
          selectedRow: action.row,
          selectedStone: state.elementArray[action.row][action.column],
          moveArray: moveArray,
        };
      }

    case "MOVE":
      if (state.selectedClmn != -1 && state.selectedRow != -1) {
        const type = state.elementArray[state.selectedRow][state.selectedClmn];
        const buf = state.elementArray;

        var count1 = state.count1;
        var count2 = state.count2;
        var eating = false;

        buf[state.selectedRow][state.selectedClmn] = 0;
        buf[action.row][action.column] = type;

        const moveArray = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        var player = state.player == 2 ? 1 : 2;

        if (action.flag == true) {
          player = state.player;
        }

        if (Math.abs(state.selectedClmn - action.column) >= 2) {
          if (
            state.selectedClmn < action.column &&
            state.elementArray[state.selectedRow][action.column - 1] != 0
          ) {
            buf[state.selectedRow][action.column - 1] = 0;
            eating = true;
          } else if (
            state.selectedClmn > action.column &&
            state.elementArray[state.selectedRow][action.column + 1] != 0
          ) {
            buf[state.selectedRow][action.column + 1] = 0;
            eating = true;
          }

          if (eating == true) {
            if (state.selectedStone == 1) {
              count2 = count2 + 1;
            } else {
              count1 = count1 + 1;
            }
          }
        } else if (Math.abs(state.selectedRow - action.row) >= 2) {
          if (
            state.selectedRow < action.row &&
            state.elementArray[action.row - 1][state.selectedClmn] != 0
          ) {
            buf[action.row - 1][state.selectedClmn] = 0;
            eating = true;
          } else if (
            state.selectedRow > action.row &&
            state.elementArray[action.row + 1][state.selectedClmn] != 0
          ) {
            buf[action.row + 1][state.selectedClmn] = 0;
            eating = true;
          }

          if (eating == true) {
            if (state.selectedStone == 1) {
              count2 = count2 + 1;
            } else {
              count1 = count1 + 1;
            }
          }
        }

        if (action.row == 0 && state.selectedStone == 2) {
          buf[action.row][action.column] = 22;
        } else if (action.row == 7 && state.selectedStone == 1) {
          buf[action.row][action.column] = 11;
        }

        return {
          ...state,
          moveArray: moveArray,
          selectedClmn: state.selectedClmn,
          selectedRow: state.selectedRow,
          elementArray: buf,
          selectedStone: 0,
          player: player,
          continue: action.flag,
          eating: eating,
          count1: count1,
          count2: count2,
        };
      } else {
        return {
          ...state,
        };
      }

    default:
      return {
        ...state,
      };
  }
};

export default gameReducer;
