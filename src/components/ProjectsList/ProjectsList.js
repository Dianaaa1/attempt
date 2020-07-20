import React from "react";
import OneProject from "../OneProject/OneProject";

function AllProjects(props) {
  var projects = props.projects.map((project, index) => {
    return (
      <OneProject
        index={index}
        projects={projects}
        project={project}
        editProject={props.editProject}
        markToDone={props.markToDone}
        removeProject={props.removeProject}
      ></OneProject>
    );
  });

  return (
    <div className="projectlist">
      Your project: <br /> {projects}
    </div>
  );
}

export default AllProjects;
