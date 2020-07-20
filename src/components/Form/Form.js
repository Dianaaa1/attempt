import React from 'react'
import './style.css'
import { Formik } from 'formik';


function Form(props){

        const onSubmit=(obj)=>{

            let name=obj.name;
            let description=obj.description;
            if(name!==''  && description!==''){
              props.addItem({ name, description});
              
            }
            else alert("Введите все данные");       
        }

    return (
    <div className="wrapper">
        <div className="project-form">
        <Formik
      initialValues={{ name: "" , description: " "}}
      onSubmit={onSubmit}>
      {props => {
        const {
          values,
          handleChange,
          handleSubmit,
          handleReset
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" style={{ display: "block" }}>
              Name
            </label>
            <input
              id="name"
              placeholder="Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              
              className="project-name"
            />
              <label htmlFor="description" style={{ display: "block" }}>
              Description
            </label>
            <input
              id="description"
              placeholder="Description"
              type="text"
              value={values.description}
              onChange={handleChange}
              
              className="project-name"
            />
            <br/>
            <button type="submit">
              Add
            </button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </form>
        );
      }}
    </Formik>
        </div>
    </div> )
}
export default Form;