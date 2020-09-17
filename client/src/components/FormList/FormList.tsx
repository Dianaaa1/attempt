import React from "react";
import Form from "../Form/Form";
import { List } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsFromNewStore, getNewStore } from "../redux/selectors";
import { allProject } from "../redux/actions/action";
import OneProject from "../OneProject/OneProject";

const FormList =()=> {
    const dispatch=useDispatch()
    const store=useSelector(getNewStore);
    const token = localStorage.token;
    const projects = useSelector(getProjectsFromNewStore);
    //с бд вытягиваем все проекты
    const getAllPojectsFromDb=()=>{
      fetch('http://localhost:4000/projects/read',{
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json'
        },
      })
      .then((response) => {
        return response.json();
      }).then((res)=>{
        if(store.isFetching && res)
        dispatch(allProject(res, false));
       })
      .catch((error: any) => {
        console.log("errr  :", error)
        Promise.reject(error);
      });
    }
    getAllPojectsFromDb();
  return (
    <div>
      <Form/>
      <List className="proj-list">
      {projects && projects.length
        ? projects.map((project: any) => {
            return <OneProject key={project._id} project={project} />;
          })
        : "Проэктов еще нет!"}
    </List>  
    </div>
  );
  
}
export default FormList;
