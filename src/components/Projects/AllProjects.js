import {
  Grid,
  Typography,
  Link,
  Button,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { allProjects } from "../../redux/projects/reducer";
import NewProject from "./NewProject";
const cardStyle = {
  padding: "2vh",
  background: "#E4F9E5",
  border: "1px solid #f4f4f4",
  margin: "2vh",
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: "4px",
};

const AllProjects = (props) => {
  const { getAllProjects } = props;
  const [open, setOpen] = useState(false);
  const { allProjects } = useSelector((state) => state.projectStore);
  useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);
  return (
    <Grid container>
      <Grid
        item
        xs={8}
        container
        spacing={3}
        style={{ padding: "2vh", margin: "auto" }}
      >
        <Grid item xs={10}>
          <Typography variant="h4">All Projects</Typography>
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ height: "6vh", borderRadius: "2vh" }}
            onClick={() => setOpen(true)}
          >
            Create Project
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={4}>
          {allProjects.length >= 1 ? (
            <Grid>
              {allProjects.map((project) => (
                <ProjectCard key={project._id} project={project}></ProjectCard>
              ))}
            </Grid>
          ) : (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignContent="center"
              spacing={2}
            >
              <Grid item>
                <Typography variant="h5">No Projects Found!</Typography>
              </Grid>
              <Grid item>
                <Link href="/new-project">New Project</Link>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <NewProject callback={true} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

const ProjectCard = ({ project }) => {
  const history = useHistory();
  const edit = () => {
    history.push(`/project/${project._id}`);
  };
  return (
    <Grid container style={cardStyle} direction="column" spacing={3}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5">{project.title}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6">Total Nodes</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
               {
                 !project.data ? 0 : <>
                 {project.data.nodeDataArray ? project.data.nodeDataArray.length : null}
                 </>
               }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6">Total Relations</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
              {
                 !project.data ? 0 : <>
                 {project.data.linkDataArray ? project.data.linkDataArray.length : null}
                 </>
               }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginTop: "3vh" }}
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button
            style={{ backgroundColor: "#78909c", color: "#ffffff" }}
            onClick={edit}
          >
            Edit
          </Button>
        </Grid>
        <Grid item>
          <Button style={{ backgroundColor: "#d32f2f", color: "#ffffff" }}>
            Delete
          </Button>
        </Grid>
        <Grid item>
          <Button style={{ backgroundColor: "#1976d2", color: "#ffffff" }}>
            Share
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProjects: () => dispatch(allProjects()),
  };
};

export default connect(null, mapDispatchToProps)(AllProjects);
