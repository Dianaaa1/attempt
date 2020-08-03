import React from "react";
import { useSelector } from "react-redux";
import OneProject from "../OneProject/OneProject";
import { getProjs } from "../redux/selectors";

function AllProjects(props) {
  const projs = useSelector(getProjs);
  return (
    <ul className="proj-list">
      {projs && projs.length
        ? projs.map((proj) => {
          return <OneProject key={`proj-${proj.id}`} proj={proj} />;
        })
        : "Проэктов еще нет! "}
    </ul>
  );
}
export default AllProjects;
