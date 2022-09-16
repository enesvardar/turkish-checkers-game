const initialValue = {
  player: 1,

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

  selectedClmn: -1,
  selectedRow: -1,
  selectedStone: 0,
  continue: false,

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
        var lCnt = 0;
        var rCnt = 0;

        var type = 0;

        if (state.player == 1) {
          type = 2;

          if (elementArray[row + 1][clm] != 0) {
            for (let r_i = row; r_i <= 6; r_i = r_i + 2) {
              if (
                elementArray[r_i + 1][clm] == 2 &&
                elementArray[r_i + 2][clm] == 0
              ) {
                moveArray[r_i + 2][clm] = -1;
                fCnt++;
              } else {
                break;
              }
            }
          } else {
            fCnt = 0;
            moveArray[row + 1][clm] = -1;
          }
        } else {
          type = 1;

          if (elementArray[row - 1][clm] != 0) {
            for (let r_i = row; r_i >= 2; r_i = r_i - 2) {
              if (
                elementArray[r_i - 1][clm] == 1 &&
                elementArray[r_i - 2][clm] == 0
              ) {
                moveArray[r_i - 2][clm] = -1;
                fCnt++;
              } else {
                break;
              }
            }
          } else {
            moveArray[row - 1][clm] = -1;
            fCnt = 0;
          }
        }

        if (elementArray[row][clm + 1] != 0) {
          for (let c_i = clm; c_i <= 6; c_i = c_i + 2) {
            if (
              elementArray[row][c_i + 1] == type &&
              elementArray[row][c_i + 2] == 0
            ) {
              moveArray[row][c_i + 2] = -1;
              lCnt++;
            } else {
              break;
            }
          }
        } else {
          moveArray[row][clm + 1] = -1;
          lCnt = 0;
        }

        if (elementArray[row][clm - 1] != 0) {
          for (let c_i = clm; c_i >= 2; c_i = c_i - 2) {
            if (
              elementArray[row][c_i - 1] == type &&
              elementArray[row][c_i - 2] == 0
            ) {
              moveArray[row][c_i - 2] = -1;
              rCnt++;
            } else {
              break;
            }
          }
        } else {
          moveArray[row][clm - 1] = -1;
          rCnt = 0;
        }

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
        console.log("kimdi")
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

        if (Math.abs(state.selectedClmn - action.column) == 2) {
          if (state.selectedClmn < action.column) {
            buf[state.selectedRow][state.selectedClmn + 1] = 0;
          } else {
            buf[state.selectedRow][state.selectedClmn - 1] = 0;
          }

          if (state.selectedStone == 1) {
            count2 = count2 + 1;
          } else {
            count1 = count1 + 1;
          }
        } else if (Math.abs(state.selectedRow - action.row) == 2) {
          if (state.selectedRow < action.row) {
            buf[state.selectedRow + 1][state.selectedClmn] = 0;
          } else {
            buf[state.selectedRow - 1][state.selectedClmn] = 0;
          }

          if (state.selectedStone == 1) {
            count2 = count2 + 1;
          } else {
            count1 = count1 + 1;
          }
        }

        if(action.row == 0 && state.selectedStone == 2){
          buf[action.row][action.column] = 22;
        }

        else if(action.row == 7 && state.selectedStone == 1){
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
