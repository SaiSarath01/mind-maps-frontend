import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { newProject } from "../../redux/projects/reducer";
import { useHistory } from "react-router-dom";

const NewProject = (props) => {
  const history = useHistory();
  const { newProject } = props;
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (title) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title]);
  const createProject = async () => {

    const { responseStatus } = await newProject(title);
    if (responseStatus === 200) {
      history.push(`projects`);
      if(props.callback){
        props.onClose()
      }
    }
  };
  return (
    <Grid container justifyContent="center" alignItems="center" style={{padding:"2vh"}}>
      <Grid container xs={8} direction="column" spacing={3} style={{margin:"auto"}}>
        <Grid item xs={8}>
          <Typography variant="h5">Title</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant="outlined"
            placeholder="Project Title"
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={8}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ height: "6vh", borderRadius: "2vh" }}
            disabled={disabled}
            onClick={createProject}
          >
            Create Project
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    newProject: (title) => dispatch(newProject(title)),
  };
};

export default connect(null, mapDispatchToProps)(NewProject);
