import React, { useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import "../OneProject/style.css";
import {
  toggleProject,
  deleteProject,
  editProject,
} from "../redux/actions/action";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ListItem,
  Box,
  Typography,
  ButtonGroup,
  Button,
  TextField,
} from "@material-ui/core";

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
    <ListItem
      className="proj-item"
      style={!project.name ? { display: "none" } : { display: "block" }}
    >
      <Box
        component="div"
        class={project && project.completed ? "done" : "undone"}
        onClick={useCallback(() => dispatch(toggleProject(project.id)), [
          dispatch,
          project.id,
        ])}
      >
        {project && project.completed ? "👌" : "✍"}{" "}
        <Typography display="inline" variant="h6">
          {" "}
          Name:{" "}
        </Typography>{" "}
        {project.name} <br />
        <Typography display="inline" variant="h6">
          {" "}
          Descripiton:{" "}
        </Typography>{" "}
        {project.description} <br />
      </Box>
      <div className="but-group">
      <ButtonGroup 
      component="div"
        variant="text"
        color="secondary"
        aria-label="text primary button group"
      >
        <Button
          color="secondary"
          onClick={useCallback(() => {
            dispatch(deleteProject(project.id));
          }, [dispatch, project.id])}
        >
          Delete{" "}
        </Button>
        <Button onClick={useCallback(showEditForm, [])}>Edit</Button>
      </ButtonGroup></div>
      <div className="project-form">
        <form
          style={{ display: "none" }}
          onSubmit={formik.handleSubmit}
          ref={editform}
          className="form-update"
        >
          <TextField
            fullWidth
            type="text"
            name="name"
            label="name"
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
          <TextField
            fullWidth
            type="text"
            name="description"
            value={formik.values.description}
            onBlur={useCallback((e) => setDescription(e.target.value), [])}
            onChange={useCallback(formik.handleChange, [])}
            label="description"
          />
          <div className="errors">
            {formik.errors.description && formik.touched.description && (
              <p>{formik.errors.description}</p>
            )}
          </div>
          <br />
          <Button variant="contained" type="submit" color="secondary">
            Save
          </Button>
        </form>
      </div>
    </ListItem>
  );
};

export default OneProject;
