import React, { lazy, Suspense } from "react";
import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";
import FallBack from "./components/FallBack";
import './App.css';
import dotenv from 'dotenv';

dotenv.config()

const history = createBrowserHistory();

const HomePage = lazy(() => import("./components/HomePage"))
const RegisterPage = lazy(() => import("./components/RegisterPage"))
const AllProjects = lazy(() => import("./components/Projects/AllProjects"))
const NewProject = lazy(() => import("./components/Projects/NewProject"))
const Project = lazy(() => import("./components/Projects/Project"))

const App = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<FallBack />}>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/projects" component={AllProjects}></Route>
        <Route exact path="/new-project" component={NewProject}></Route>
        <Route exact path="/project/:projectId" component={Project}></Route>
      </Suspense>
    </Router>
  );
};

export default App;
