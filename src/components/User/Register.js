import React from "react";
import { Formik, Form } from "formik";
import { Button, Grid, TextField, Typography, Link } from "@material-ui/core";
import { register } from "../../redux/user/reducer";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const initialValues = {
  email: "",
  name:"",
  password: "",
};

const Login = (props) => {
  const history = useHistory()
  const registerUser = async (values) => {
    const {responseStatus} = await props.registerUser(values);
    if(responseStatus === 200){
      history.push('/projects');
    }
  };
  return (
    <Grid
      xs={12}
      container
      spacing={3}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h5">Register</Typography>
      </Grid>
      <Grid item>
        <Formik initialValues={initialValues} onSubmit={registerUser}>
          {(formik) => {
            return (
              <Form>
                <Grid container direction="column" spacing={3}>
                <Grid item direction="column">
                    <Typography>Name</Typography>
                    <TextField
                      style={{ width: "320px" }}
                      id="name"
                      variant="outlined"
                      placeholder="Enter Name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    ></TextField>
                  </Grid>
                  <Grid item direction="column">
                    <Typography>Email</Typography>
                    <TextField
                      style={{ width: "320px" }}
                      id="email"
                      variant="outlined"
                      placeholder="Enter Email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    ></TextField>
                  </Grid>
                  <Grid item direction="column">
                    <Typography>Password</Typography>
                    <TextField
                      style={{ width: "320px" }}
                      type="password"
                      variant="outlined"
                      placeholder="Enter Password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} container direction="column">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ height: "6vh", borderRadius: "2vh" }}
                    >
                      Create Account
                    </Button>
                  </Grid>
                  <Grid item container justifyContent="center">
                    <Typography>
                      Existing User? <Link href="/">Sign In</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (registerDetails) => dispatch(register(registerDetails)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
