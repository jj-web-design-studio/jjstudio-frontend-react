import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import ui from "./ui_reducer";
import keyboard from "./keyboard_reducer";
import sounds from "./sound_reducer";

//syntantic sugar for:
// errors: errors
const RootReducer = combineReducers({
  errors,
  session,
  ui,
  keyboard,
  sounds,
});

export default RootReducer;
