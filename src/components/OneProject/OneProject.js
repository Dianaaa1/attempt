import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import { toggleProj, deleteProj, editProj } from "../redux/actions/action";

const OneProject = ({ proj }) => {

  const editform = useRef(null);
  const editname = useRef(null);
  const editdescription = useRef(null);

  const showEditForm = () => {
    if (editform.current.style.display === "none")
      editform.current.style.display = "block";
    else editform.current.style.display = "none";
  };

  const dispatch = useDispatch();
  const [name, setName] = useState({ name: "" });
  const [description, setDescription] = useState({ name: "" });

  return (
    <li className="proj-item">
      <div onClick={() => dispatch(toggleProj(proj.id))}>
        {proj && proj.completed ? "👌" : "👋"}{" "}
        <span
          className={cx(
            "proj-item__text",
            proj && proj.completed && "proj-item__text--completed"
          )}
        >
          Name: {proj.name} <br /> Descripiton: {proj.description}
        </span>
      </div>
      <button
        onClick={() => {
          dispatch(deleteProj(proj.id));
        }}
      >
        Delete
      </button>
      <button onClick={showEditForm}>Edit</button>
      <div className="project-form">
        <form
          style={{ display: "none" }}
          onSubmit={event => {
            event.preventDefault();
            dispatch(editProj(proj.id, name, description));
          }}
          ref={editform}
          className="form-update"
        >
          <fieldset>
            <input
              type="text"
              ref={editname}
              placeholder="name"
              onBlur={e => setName(e.target.value)}
            />{" "}
            <br />
            <input
              type="text"
              ref={editdescription}
              onBlur={e => setDescription(e.target.value)}
              DessetDescription="description"
              placeholder="description"
              id="description"
            />{" "}
            <br />
            <input type="submit" value="Save Project" />
          </fieldset>
        </form>
      </div>
    </li>
  );
};

export default OneProject;
