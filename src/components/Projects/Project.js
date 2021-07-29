import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import {
  getProjectDetail,
  saveProjectDetail,
} from "../../redux/projects/reducer";
import Graph from "../Graph";

const Project = (props) => {
  const { getProjectDetail, saveProjectDetail } = props;
  const [nodeDataArray, setNodeDataArray] = useState([]);
  const [linkDataArray, setLinkDataArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState(null);
  // const { project } = useSelector((state) => state.projectStore);

  useEffect(() => {
    const getProject = async (projectId) => {
      const response = await getProjectDetail(projectId);
      if (response === 200) {
        setLoading(false);
      }
    };
    getProject(props.match.params.projectId);
  }, [props.match.params.projectId, getProjectDetail]);
  const { project } = useSelector((state) => state.projectStore);
  useEffect(() => {
    //
    if (!loading) {
      if (!!project.data) {
        if (!!project.data.nodeDataArray && project.data.nodeDataArray.length > 0) {
          setNodeDataArray([...project.data.nodeDataArray]);
        }
        if (!!project.data.linkDataArray && project.data.linkDataArray.length > 0) {
          setLinkDataArray([...project.data.linkDataArray]);
        }
      }
    }
  }, [project, loading]);
  const addNewNode = () => {
    const x = Math.floor(Math.random() * 500);
    const y = Math.floor(Math.random() * 100);
    const newNode = {
      key: nodeDataArray.length + 1,
      text: `N-${nodeDataArray.length + 1}`,
      color: "#f4f4f4",
      loc: `${x} ${y}`,
    };

    setNodeDataArray([...nodeDataArray, newNode]);
  };
  const saveGraph = () => {
    saveProjectDetail(project._id, nodeDataArray, linkDataArray);
  };
  const handleModelChange = async (changes) => {
    if (!graphData) {
      setGraphData(changes);
    }
    // node modification
    if (changes.modifiedNodeData) {
      let changedNode = nodeDataArray.filter(
        (node) => node.key === changes.modifiedNodeData[0].key
      );
      changedNode[0].loc = changes.modifiedNodeData[0].loc;
      changedNode[0].text = changes.modifiedNodeData[0].text;
      setNodeDataArray([...nodeDataArray]);
    }
    if (changes.insertedLinkKeys) {
      const isLinkAdded = (linkDataArray.filter((link) => link.key === changes.modifiedLinkData[0].key))[0]
      if(!isLinkAdded) {
        setLinkDataArray([...linkDataArray, changes.modifiedLinkData[0]]);
      }
    }
    // link modification
    if (changes.removedLinkKeys) {
      const getOtherLinks = linkDataArray.filter(
        (link) => link.key !== changes.removedLinkKeys[0]
      );
      setLinkDataArray([...getOtherLinks]);
    }
    // removing node
    if (changes.removedNodeKeys) {
      const getOtherNodes = nodeDataArray.filter(
        (node) => node.key !== changes.removedNodeKeys[0]
      );
      setNodeDataArray([...getOtherNodes]);
    }
    saveGraph()
  };
  return (
    <Grid container>
      <Grid item xs={12} style={{ backgroundColor: "#11717d" }}>
        <Typography
          style={{
            color: "#ffffff",
            fontSize: "24px",
            fontWeight: "bold",
            marginLeft: "8vh",
          }}
        >
          {project.title}
        </Typography>
      </Grid>
      <Grid container>
        <Grid item xs={1} style={{ marginTop: "2vh" }}>
          <Grid container justifyContent="center">
            <Grid item style={{ padding: "1vh" }}>
              <Button variant="contained" color="primary" onClick={addNewNode}>
                Add Node
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={saveGraph}>
                Save Graph
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11} style={{ marginTop: "2vh" }}>
          <Graph
            nodeDataArray={nodeDataArray}
            linkDataArray={linkDataArray}
            handleModelChange={handleModelChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectDetail: (projectId) => dispatch(getProjectDetail(projectId)),
    saveProjectDetail: (projectId, nodeDataArray, linkDataArray) =>
      dispatch(saveProjectDetail(projectId, nodeDataArray, linkDataArray)),
  };
};

export default connect(null, mapDispatchToProps)(Project);
