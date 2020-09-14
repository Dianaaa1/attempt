import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@material-ui/core";
import qs from "qs";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required!"),
      password: Yup.string().required("Required!"),
    }),
    onSubmit: async () => {
      await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: qs.stringify({ username: username, password: password }),
      })
        .then((response) => {
          return response.clone().text();
        })
        .then((response) => {
          setTimeout(() => alert(response), 500);
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },
  });

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            label="Username"
            variant="filled"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={useCallback(formik.handleChange, [])}
            onBlur={useCallback(
              (e: React.FocusEvent<HTMLInputElement>) =>
                setUsername(e.target.value),
              []
            )}
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
            onBlur={useCallback(
              (e: React.FocusEvent<HTMLInputElement>) =>
                setPassword(e.target.value),
              []
            )}
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
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Login;
