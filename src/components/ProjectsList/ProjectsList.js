import React from "react";
import { useSelector } from "react-redux";
import OneProject from "../OneProject/OneProject";
import { getProjects } from "../redux/selectors";
import { List } from "@material-ui/core";

function AllProjects(props) {
  const projects = useSelector(getProjects);
  return (
    <List className="proj-list">
      {projects && projects.length
        ? projects.map((project) => {
            return <OneProject key={project.id} project={project} />;
          })
        : "Проэктов еще нет! "}
    </List>
  );
}
export default AllProjects;
