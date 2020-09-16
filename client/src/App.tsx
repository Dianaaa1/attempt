import React, { useState } from "react";
import Form from "./components/Form/Form";
import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useDispatch, useSelector } from "react-redux";
import { getAuthStatus } from "./components/redux/selectors";
import rootSaga from "./components/saga/sagas";
import { sagaMiddleware } from "./components/redux/reducers/store";
import { MuiThemeProvider, createMuiTheme, Button, CssBaseline, PaletteType} from "@material-ui/core";
import { authUser, letFetch} from "./components/redux/actions/action";
import FormList from './components/FormList/FormList'
//запускаем сагу
sagaMiddleware.run(rootSaga);

const Projects: React.FC = () => {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState({
    palette: {
      type: "light" as PaletteType,
    },
  });
  //переключаем тему
  const toggleTheme = () => {
    let NewPaletteType = theme.palette.type === "light" ? "dark" : "light";
    setTheme({ palette: { type: NewPaletteType as PaletteType } });
  };
  const muitheme = createMuiTheme(theme);
  //проверяем токен
  const getToProfile = () => {
    const token = localStorage.token;
    if (token) {
      return fetch("http://localhost:4000/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          return resp.text();
        })
        .then((data) => {
          if (!data) {
            localStorage.removeItem("token");
          } else {
            console.log("data", data);
            dispatch(authUser(true));
            dispatch(letFetch(true));
          }
        })
        .catch((err) => console.log(err));
    }
  };
  getToProfile();
  const logStatus = useSelector(getAuthStatus);
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
            {logStatus ? <Form /> : <Redirect to="/login" />}
          </Route>
          <Route path="/form">
            <FormList/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
            <Link to="/register">Зарегестрироваться</Link>
          </Route>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
};
export default Projects;
