import React from "react";
import Login from "./User/Login";

import { Grid } from "@material-ui/core";

const HomePage = (props) => {

  return (
    <Grid container className="home" direction="row">
      <Grid item xs={6} className="title">
        <h2>Welcome to MindMap</h2>
      </Grid>
      <Grid item xs={5} className="login-grid">
       <Login />
      </Grid>
    </Grid>
  );
};

export default HomePage;
