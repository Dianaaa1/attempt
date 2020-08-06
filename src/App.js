import React from "react";
import Form from "./components/Form/Form";
import ProjectsList from "./components/ProjectsList/ProjectsList";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import rootSaga from "./components/saga/sagas";
import { sagaMiddleware } from "./components/redux/reducers/store";

sagaMiddleware.run(rootSaga);

function Projects(props) {
  return (
    <div className="main">
      <BrowserRouter>
        <Route exact path="/">
          {localStorage.getItem("user") ? (
            <Form />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/form">
          <Form />
          <ProjectsList/> 
        </Route>
        <Route path="/login" render={() => <Login />} />
      </BrowserRouter>
    </div>
  );
}
export default Projects;
