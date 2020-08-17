import React, { useState } from "react";
import Form from "./components/Form/Form";
import ProjectsList from "./components/ProjectsList/ProjectsList";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import rootSaga from "./components/saga/sagas";
import { sagaMiddleware } from "./components/redux/reducers/store";
import {
  MuiThemeProvider,
  createMuiTheme,
  Button,
  CssBaseline,
  PaletteType,
} from "@material-ui/core";

sagaMiddleware.run(rootSaga);

const Projects:React.FC=()=>{
  const [theme, setTheme] = useState({
    palette: {
      type: "light" as PaletteType,
    },
  });

  const toggleTheme = () => {
    let NewPaletteType = theme.palette.type === "light" ? "dark" : "light";
    setTheme({ palette: { type: NewPaletteType as PaletteType} });
  };

  const muitheme = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={muitheme}>
      <CssBaseline />
      <div className="main">
        <BrowserRouter>
          <Button variant="contained" onClick={toggleTheme}>
            {theme.palette.type === "light" ? (
              <span className="material-icons">nights_stay</span>
            ) : (
              <span className="material-icons">wb_sunny</span>
            )}
          </Button>
          <Route exact path="/">
            {localStorage.getItem("user") ? <Form /> : <Redirect to="/login" />}
          </Route>
          <Route path="/form">
            <Form />
            <ProjectsList />
          </Route>
          <Route path="/login" render={() => <Login />} />
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}
export default Projects;