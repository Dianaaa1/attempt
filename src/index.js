import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./components/redux/reducers/store";

import { configureFakeBackend } from './components/back';
import { ThemeProvider } from "@material-ui/core";
import theme from './components/theme';
configureFakeBackend();



const rootElement = document.getElementById("root");
ReactDOM.render(
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <App />
  </Provider>
  </ThemeProvider>,
  rootElement
);

