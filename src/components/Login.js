import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import {  useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "./redux/actions/action";
import { getAuthStatus } from "./redux/selectors";
import * as Yup from "yup";

function Login() {
  
  const dispatch = useDispatch();
  const logStatus = useSelector(getAuthStatus);

  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState({ password: "" });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required!"),
      password: Yup.string().required("Required!"),
    }),
    onSubmit: () => {
      dispatch(userData(username, password))
      
    },
  });
  
  return (
    <div>
      {logStatus? <Redirect to={{ pathname: "/form"}}/>: <div></div> }
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label> Username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={useCallback(formik.handleChange, [])}
            onBlur={useCallback((e) => setUsername(e.target.value), [])}
          />
          <div className="errors">
            {formik.errors.username && formik.touched.username && (
              <p>{formik.errors.username}</p>
            )}
          </div>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onBlur={useCallback((e) => setPassword(e.target.value), [])}
            onChange={useCallback(formik.handleChange, [])}
          />
          <div className="errors">
            {formik.errors.password && formik.touched.password && (
              <p>{formik.errors.password}</p>
            )}
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
/*
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
*/
