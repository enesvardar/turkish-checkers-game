import { combineReducers } from "redux";
import gameReducer from "./game";

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;
