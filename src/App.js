import React, { useState } from "react";
import Form from "./components/Form/Form";
import ProjectsList from "./components/ProjectsList/ProjectsList";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";

function Projects(props) {
  const [projects, Updateprojects] = useState([]);
  //создаем проект
  const addItem = (projeect) => {
    const allprojects = [
      ...projects,
      {
        id: Math.random(),
        name: projeect.name,
        description: projeect.description,
        done: false,
      },
    ];
    Updateprojects(allprojects);
  };
  const editProject = (i, project) => {
    projects.splice(i, 1, project);
    const allprojects = [...projects];
    Updateprojects(allprojects);
  };
  const removeItem = (index) => {
    projects.splice(index, 1);
    const allprojects = [...projects];
    Updateprojects(allprojects);
  };
  const markToDone = (index) => {
    var done = projects[index].done;
    projects[index].done = !done;
    const allprojects = [...projects];
    Updateprojects(allprojects);
  };
  return (
    <div className="main">
      <BrowserRouter>
        <Route exact path="/">
          {localStorage.getItem("user") ? (
            <Form addItem={addItem} editProject={editProject} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/form">
          <Form addItem={addItem} editProject={editProject} />
          <ProjectsList
            projects={projects}
            editProject={editProject}
            markToDone={markToDone}
            removeProject={removeItem}
          />
        </Route>
        <Route path="/login" render={() => <Login />} />
      </BrowserRouter>
    </div>
  );
}
export default Projects;
