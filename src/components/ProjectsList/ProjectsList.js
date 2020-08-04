import React from "react";
import { useSelector } from "react-redux";
import OneProject from "../OneProject/OneProject";
import { getProjects } from "../redux/selectors";

function AllProjects(props) {
  const projects = useSelector(getProjects);
  return (
    <ul className="proj-list">
      {projects && projects.length
        ? projects.map((project) => {
            return <OneProject key={project.id} project={project} />;
          })
        : "Проэктов еще нет! "}
    </ul>
  );
}
export default AllProjects;
