import React, { useRef } from 'react'
import './style.css'

function OneProject(props){
     
     const editform=useRef(null);
     const editname=useRef(null);
     const editdescription=useRef(null);
    
     const save=(event)=>{
          event.preventDefault();
          var name=editname.current.value;
          var description=editdescription.current.value;
          if(name=='' || description==''){
              alert("Введите все данные");
              return;   
          }
          props.editProject(props.index, {name, description});
          
      }
      //показываю кнопку
      const showEditForm=()=>{
        editform.current.style.display="block";
      }
        var classtoggle=props.project.done ?  'done':  'undone';
    return (
    <div className="wrapper">
        <div className="project">
            <div onClick={()=>props.markToDone(props.index)} className={classtoggle}>
                <div className="title-name">Name: </div>
                <div className="item-name"> {props.project.name}</div>
                <div className="title-description">Description:</div>
                <div className="item-description"> {props.project.description}</div>
            </div>
            <button onClick={()=>props.removeProject(props.index)}>Delete</button>
            <button onClick={showEditForm}>Edit</button>
        </div>
        <div className="project-form">
            <form ref={editform} onSubmit={save} className="form-update">
                <fieldset>               
                <input type="text" ref={editname} placeholder="name" /> <br />
                <input type="text" ref={editdescription} name="description" placeholder="description" id="description"/> <br />
                <input type="submit" value="Save Project"/> 
                </fieldset>
            </form>
        </div>
    </div> )
}
export default OneProject;