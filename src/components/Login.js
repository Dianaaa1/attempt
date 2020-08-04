import React from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./redux/actions/action";
import { getAuthStatus } from "./redux/selectors";

function Login() {
  //logout();

  const dispatch = useDispatch();
  const logStatus = useSelector(getAuthStatus);
  const onSubmit = (obj) => {
    const username = obj.username;
    const password = obj.password;

    //останавливается если форма пустая
    if (!(username && password)) {
      alert("Введите все данные");
      return;
    }

    login(username, password).then((user) => {
      if (localStorage.getItem("user", JSON.stringify(user))) {
        dispatch(authUser(true));
      }
    });
  };
  // если пользователь залогинен то перенаправляем на форму создания проектов
  if (logStatus) {
    return (
      <Redirect
        to={{
          pathname: "/form",
        }}
      />
    );
  }
  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
      >
        {(props) => {
          const { values, handleChange, handleSubmit, handleReset } = props;
          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                placeholder="username"
                type="text"
                value={values.username}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                placeholder="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className="project-name"
              />
              <br />
              <button type="submit">Login</button>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

function login(username, password) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ username, password }),
  };
  return fetch(`/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(
      (user) => {
        localStorage.setItem("user", JSON.stringify(user));
      },
      (error) => alert(error)
    );
}
async function handleResponse(response) {
  const data = await response.text().then((text) => JSON.parse(text));
  return data;
}
export default Login;
