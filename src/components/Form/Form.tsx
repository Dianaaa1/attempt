import React, { useState, useCallback } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { addProject, authUser } from "../redux/actions/action";
import * as Yup from "yup";
import { getAuthStatus } from "../redux/selectors";
import { TextField, Button } from "@material-ui/core";


const Form:React.FC=()=> {
  const dispatch = useDispatch();
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
    onSubmit: (event) => {
      dispatch(addProject(name, description));
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
          localStorage.removeItem("user");
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
            onBlur={useCallback((e) => setName(e.target.value), [])}
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
            onBlur={useCallback((e) => setDescription(e.target.value), [])}
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
}
export default Form;
