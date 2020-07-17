import React, { useState } from 'react'
import Form from './components/Form/Form copy'
import ProjectsList from './components/ProjectsList/ProjectsList'


 function Projects (props){
  const [projects, Updateprojects]=useState([]);
  //создаем
   const addItem=(projeect)=>{
    props.projects.push({
      id: Math.random(),
      name: projeect.name,
      description: projeect.description,
      done: false} )
    Updateprojects(props.projects);
    };
    const editProject=(i, project)=>{
      props.projects.splice(i, 1, project);
      Updateprojects(props.projects);
    }
   const removeItem=(index)=>{
      props.projects.splice(index, 1);
      Updateprojects(props.projects);
    }
    const markToDone=(index)=>{
      alert("work");
      var done=projects[index].done;
      projects[index].done=!done;
      Updateprojects(projects);
    }
      return(
        <div class="main">
        <Form addItem={addItem} editProject={editProject}/>
        <ProjectsList projects={props.projects} editProject={editProject} markToDone={markToDone} removeProject={removeItem} ></ProjectsList>
        </div>
      )
  }
  export default Projects

