import { DEACTIVATE_PRO_TIP_KEYBOARD } from "./proTipActions";

function ProTipReducer(state = {}, action) {
  switch (action.type) {
    case DEACTIVATE_PRO_TIP_KEYBOARD:
      return {
        shouldPromptProTipKeyboard: false,
      };
    default:
      return state;
  }
}

export default ProTipReducer;
