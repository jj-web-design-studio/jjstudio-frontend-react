import * as SessionAPIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

// action creators
export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

// thunk action creators

//might change this to go straight to login instead of receiveUserSignIn-- will need to test
export const signup = (user) => (dispatch) =>
  SessionAPIUtil.signup(user)
    .then(() => {
      dispatch(receiveUserSignIn());
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));

// this is to set session token in local storage
// but might change with how springboot works
export const login = (user) => (dispatch) => {
  return SessionAPIUtil.login(user)
    .then((res) => {
      const { jwt } = res.data;
      localStorage.setItem("jwtToken", jwt);
      SessionAPIUtil.setAuthToken(jwt);
      const decoded = jwt_decode(jwt);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });
};

export const logout = () => (dispatch) => {
  let token = localStorage.getItem("jwtToken");
  localStorage.removeItem("jwtToken");
  SessionAPIUtil.setAuthToken(false);
  dispatch(logoutUser());
  // SessionAPIUtil.logout(token).then(() => {
  //     dispatch(logoutUser());
  // })
  //send json back to have it deleted on the frontend
};

export const clearErrors = () => (dispatch) => {
  return dispatch(clearSessionErrors());
};
