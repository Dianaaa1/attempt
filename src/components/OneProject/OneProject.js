import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import "../OneProject/style.css";
import {
  toggleProject,
  deleteProject,
  editProject,
} from "../redux/actions/action";
import { useFormik } from "formik";
import * as Yup from "yup";

const OneProject = ({ project }) => {
  const editform = useRef(null);
  //открываем-закрываем форму редактирования
  const showEditForm = () => {
    editform.current.style.display === "none"
      ? (editform.current.style.display = "block")
      : (editform.current.style.display = "none");
  };

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
    onSubmit: () => {
      dispatch(editProject(project.id, name, description));
      formik.handleReset();
    },
  });

  return (
    <li
      className="proj-item"
      style={!project.name ? { display: "none" } : { display: "block" }}
    >
      <div onClick={() => dispatch(toggleProject(project.id))}>
        {project && project.completed ? "👌" : "✍"}{" "}
        <span className={project && project.completed ? "done" : "undone"}>
          Name: {project.name} <br /> Descripiton: {project.description}
        </span>
      </div>
      <button
        onClick={useCallback(() => {
          dispatch(deleteProject(project.id));
        }, [dispatch, project.id])}
      >
        Delete
      </button>
      <button onClick={useCallback(showEditForm, [])}>Edit</button>
      <div className="project-form">
        <form
          style={{ display: "none" }}
          onSubmit={formik.handleSubmit}
          ref={editform}
          className="form-update"
        >
          <fieldset>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formik.values.name}
              onChange={useCallback(formik.handleChange, [])}
              onBlur={useCallback((e) => setName(e.target.value), [])}
            />
            <div className="errors">
              {formik.errors.name && formik.touched.name && (
                <p>{formik.errors.name}</p>
              )}
            </div>
            <br />
            <input
              type="text"
              name="description"
              value={formik.values.description}
              onBlur={useCallback((e) => setDescription(e.target.value), [])}
              onChange={useCallback(formik.handleChange, [])}
              placeholder="description"
            />
            <div className="errors">
              {formik.errors.description && formik.touched.description && (
                <p>{formik.errors.description}</p>
              )}
            </div>
            <br />
            <input type="submit" value="Save Project" />
          </fieldset>
        </form>
      </div>
    </li>
  );
};

export default OneProject;
