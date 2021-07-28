import React from "react";

import { Grid } from "@material-ui/core";
import Register from "./User/Register";

const RegisterPage = (props) => {

  return (
    <Grid container className="home" direction="row">
      <Grid item xs={6} className="title">
        <h2>Welcome to MindMap</h2>
      </Grid>
      <Grid item xs={5} className="login-grid">
       <Register />
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
