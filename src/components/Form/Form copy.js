import React, { useRef } from 'react'
import './style.css'

function Form(props){
      const refform=useRef(null)
      const refname=useRef(null)
      const refdescription=useRef(null)
      const onSubmit=(event)=>{
          event.preventDefault();
          var name=refname.current.value;
          var description=refdescription.current.value;
          if(name!==''  && description!==''){
            props.addItem({ name, description});
            
          }
          else alert("Введите все данные");         
      }
    return (
    <div className="wrapper">
        <div className="project-form">
            <form ref={refform} onSubmit={onSubmit} class="form">
                <fieldset>
                <label for="name"> Name:</label>
                <input type="text" ref={refname} placeholder="name" /> <br />
                <label for="description"> Description:</label>
                <input type="text" ref={refdescription} name="description" placeholder="description" id="description"/> <br />
                <input type="submit" value="Add Project"/> 
                
                </fieldset>
            </form>
        </div>
        <div className="projects" id="projects">
        </div>
    </div> )
}
export default Form;