import { combineReducers } from "redux";
import modalReducer from "./modal_reducer";
import ProTipReducer from "../components/proTip/proTipReducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  proTip: ProTipReducer,
});

export default uiReducer;
