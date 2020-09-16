import React, { useState, useCallback } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { authUser } from "../redux/actions/action";
import * as Yup from "yup";
import { getAuthStatus } from "../redux/selectors";
import { TextField, Button } from "@material-ui/core";
import qs from 'qs';
import { letFetch } from "../redux/actions/action";

const Form: React.FC = () => {
  const dispatch = useDispatch();
  //добавляем имя юзера в локалсторедж, чтобы проекты добавлять конкретному юзеру, который будет определен именем
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
      description: Yup.string().required("Required!"),
    }),
    onSubmit: async (event) => {
      const token = localStorage.token;
      //запрошиваем на создание в бд
      fetch("http://localhost:4000/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: qs.stringify({name: name, description: description }),
      })
        .then((response) => {
          return response.clone().text();
        })
        .catch((error) => {
          Promise.reject(error);
        });
        dispatch(letFetch(true));
      formik.handleReset(event);
    },
  });

  //функция logout выполняется внутри и сразу же при рендировании Login page
  const auth = useSelector(getAuthStatus);
  
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          dispatch(authUser(false));
        }}
      >
        Logout
      </Button>
      {!auth ? <Redirect to={{ pathname: "/login" }} /> : <div></div>}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={useCallback(formik.handleChange, [])}
            onBlur={useCallback( (e: React.FocusEvent<HTMLInputElement>) => setName(e.target.value), [] )}
          />
          <div className="errors">
            {formik.errors.name && formik.touched.name && (
              <p>{formik.errors.name}</p>
            )}
          </div>
        </div>
        <div>
          <TextField
            type="text"
            variant="outlined"
            label="Description"
            name="description"
            value={formik.values.description}
            onBlur={useCallback(
              (e: React.FocusEvent<HTMLInputElement>) =>
                setDescription(e.target.value),
              []
            )}
            onChange={useCallback(formik.handleChange, [])}
          />
          <div className="errors">
            {formik.errors.description && formik.touched.description && (
              <p>{formik.errors.description}</p>
            )}
          </div>
        </div>
        <div>
          <Button color="secondary" variant="contained" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Form;
