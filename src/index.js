import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./components/session/sessionAPIUtil";
import { logout } from "./components/session/sessionActions";

const preloadedState = {
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

function isUserSessionExpired(expirationTime, currentTime) {
  return expirationTime < currentTime;
}

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    preloadedState.session = { isAuthenticated: true, user: decodedUser };
    store = configureStore(preloadedState);
    if (isUserSessionExpired(decodedUser.exp, Date.now() / 1000)) {
      store.dispatch(logout());
      window.location.href = "/";
    }
  } else {
    store = configureStore(preloadedState);
  }

  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});
