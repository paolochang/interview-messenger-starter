import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import store from "./store";

import { theme } from "./themes/theme";
import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </MuiThemeProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
