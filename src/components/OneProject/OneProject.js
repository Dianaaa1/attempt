import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import '../OneProject/style.css';
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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <li className="proj-item">
      <div onClick={() => dispatch(toggleProj(proj.id))}>
        {proj && proj.completed ? "👌" : "✍"}{" "}
        <span
          className={
            proj && proj.completed ? "done" : "undone"}
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
            if(name==="" || description ==="")
            {alert("Введите все данные")
            return}
            dispatch(editProj(proj.id, name, description));
            event.target.reset()
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
