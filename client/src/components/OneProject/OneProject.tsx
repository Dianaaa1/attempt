import React, { useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import "../OneProject/style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ListItem, Box, Typography, ButtonGroup, Button, TextField, } from "@material-ui/core";
import { letFetch } from "../redux/actions/action";
 
interface IoneProject{
  project:{
    name: string,
    description: string,
    completed: boolean,
    _id: string,
  }
}

const OneProject:React.FC <IoneProject>= (props) => {
  let project=props.project

  const editform = useRef() as React.MutableRefObject<HTMLFormElement>;
  //открываем-закрываем форму редактирования
  const showEditForm = () => {
    editform.current.style.display === "none"
      ? (editform.current.style.display = "block")
      : (editform.current.style.display = "none");
  };
  const token = localStorage.token;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //запрос на удаление с бд
  const deleteProject=(id: any)=>{
      fetch('http://localhost:4000/projects/delete',{
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id})
      })
      .then((response) => {
        return response.json();
      }).then((res)=>{
       })
      .catch((error) => {
        console.log("errr  :", error)
        Promise.reject(error);
      });
      //запускаем запросы
      dispatch(letFetch(true));
  }
  const editProject=(id:string, name:string, description:string)=> {
    fetch('http://localhost:4000/projects/edit',{
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id, name, description})
    })
    .then((response) => {
      return response.json();
    }).then((res)=>{
     })
    .catch((error) => {
      console.log("errr  :", error)
      Promise.reject(error);
    });
    //запускаем запросы
    dispatch(letFetch(true));
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
      description: Yup.string().required("Required!"),
    }),
    onSubmit: (ev) => {
      //по клику запрос на редактирование
      editProject(project._id, name, description)
      formik.handleReset(ev);
    },
  });
  return (
    <ListItem className="proj-item" style={!project.name ? { display: "none" } : { display: "block" }} >
      <Box component="div" className={project && project.completed ? "done" : "undone"} onClick={useCallback(() => {}, [ project._id ])} >
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
      <ButtonGroup component="div" variant="text" color="secondary" aria-label="text primary button group">
        <Button
          color="secondary"
          onClick={useCallback(() => {
            deleteProject(project._id)
          }, [project._id])}
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
          <TextField fullWidth type="text"
            name="name"
            label="name"
            value={formik.values.name}
            onChange={useCallback(formik.handleChange, [])}
            onBlur={useCallback((e: React.FocusEvent<HTMLInputElement>) => setName(e.target.value), [])}
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
            onBlur={useCallback((e: React.FocusEvent<HTMLInputElement>) => setDescription(e.target.value), [])}
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
