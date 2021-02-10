import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./app";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          color: "white",
          fontWeight: "bold",
        },
        a: {
          color: "white",
        },
      },
    },
  },
  palette: {
    type: "dark",
  },
});

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </HashRouter>
  </Provider>
);

export default Root;
