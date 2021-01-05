import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./components/session/sessionAPIUtil";
import { logout } from "./components/session/sessionActions";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
      keyboard: { currentKeyboardId: "default" },
      track: {
        track: {
          bpm: 125,
          timeSignature: {
            beat: 4,
            measure: 4,
          },
          rowCount: 1,
          contents: [[]],
        },
      },
      ui: {
        proTip: { shouldPromptProTipKeyboard: true },
      },
    };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/";
    }
  } else {
    store = configureStore({
      keyboard: { currentKeyboardId: "default" },
      track: {
        track: {
          bpm: 125,
          timeSignature: {
            beat: 4,
            measure: 4,
          },
          rowCount: 1,
          contents: [[]],
        },
      },
      ui: {
        proTip: { shouldPromptProTipKeyboard: true },
      },
    });
  }

  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});
