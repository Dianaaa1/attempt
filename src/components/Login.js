import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "./redux/actions/action";
import { getAuthStatus } from "./redux/selectors";
import * as Yup from "yup";
import { Button, TextField } from "@material-ui/core";

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
      dispatch(userData(username, password));
    },
  });

  return (
    <div>
      {logStatus ? <Redirect to={{ pathname: "/form" }} /> : <div></div>}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            label="Username"
            variant="filled"
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
          <TextField
            label="Password"
            variant="filled"
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
          <Button type="submit" color="primary" variant="contained">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
export default Login;
