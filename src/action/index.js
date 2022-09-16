import * as types from "../action/types";

export const select = async (row, column, dispatch) => {
  dispatch({
    type: types.SELECT,
    row: row,
    column: column,
  });
};

export const move = async (row, column, flag, dispatch) => {
  dispatch({
    type: types.MOVE,
    row: row,
    column: column,
    flag: flag,
  });
};
