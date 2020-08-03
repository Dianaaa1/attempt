import React, { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import { addProj } from "../redux/actions/action";

function Form(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState({ name: "" });
  const [description, setDescription] = useState({ name: "" });
  const [auth, logout] = useState(true);
  //функция logout выполняется внутри и сразу же при рендировании Login page
  if (!auth)
    return <Redirect
      to={{
        pathname: "/login",
      }} />
  return (
    <div>
      <button onClick={() => logout(false)}>Logout</button>
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={() => dispatch(addProj(name, description))}
      >
        {props => {
          const { values, handleChange, handleSubmit, handleReset } = props;
          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" style={{ display: "block" }}>
                Name
              </label>
              <input
                id="name"
                placeholder="Name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={e => setName(e.target.value)}
                className="project-name"
              />
              <label htmlFor="description" style={{ display: "block" }}>
                Description
              </label>
              <input
                id="description"
                placeholder="Description"
                type="text"
                value={values.description}
                onChange={handleChange}
                onBlur={e => setDescription(e.target.value)}
                className="project-name"
              />
              <br />
              <button
                type="submit"
                onClick={() => {
                  handleReset();
                }}
              >
                Add
                        </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
export default Form;
