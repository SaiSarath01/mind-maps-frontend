import {
  Button,
  Grid,
  Typography,
  Drawer as Slider,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
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
  const [sliderOpen, setSliderOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedNodeColor, setSelectedNodeColor] = useState("");
  const [nodeShape, setNodeShape] = useState("");
  const [nodeFont, setNodeFont] = useState("");
  const { project } = useSelector((state) => state.projectStore);
  useEffect(() => {
    const getProject = async (projectId) => {
      const response = await getProjectDetail(projectId);
      if (response === 200) {
        setLoading(false);
      }
    };
    getProject(props.match.params.projectId);
  }, [props.match.params.projectId, getProjectDetail]);
  useEffect(() => {
    if (!loading) {
      if (!!project.data) {
        if (
          !!project.data.nodeDataArray &&
          project.data.nodeDataArray.length > 0
        ) {
          setNodeDataArray([...project.data.nodeDataArray]);
        }
        if (
          !!project.data.linkDataArray &&
          project.data.linkDataArray.length > 0
        ) {
          setLinkDataArray([...project.data.linkDataArray]);
        }
      }
    }
  }, [project, loading]);
  const openSlider = (node) => {
    setSelectedNode(node);
    setSelectedNodeColor(node.color);
    setNodeShape(node.shape);
    setNodeFont(node.font);
    setSliderOpen(true);
  };
  const addNewNode = () => {
    const x = Math.floor(Math.random() * 500);
    const y = Math.floor(Math.random() * 100);
    const newNode = {
      key: nodeDataArray.length + 1,
      text: `N-${nodeDataArray.length + 1}`,
      shape: "Circle",
      color: "#f4f4f4",
      loc: `${x} ${y}`,
      font: "16px sans-serif",
      movable: true,
      items: [],
    };

    setNodeDataArray([...nodeDataArray, newNode]);
  };
  const saveGraph = (graphNodeData, graphLinkData) => {
    if (graphNodeData.length > 0) {
      saveProjectDetail(
        props.match.params.projectId,
        graphNodeData,
        graphLinkData
      );
    }
  };

  const updateNodeProperties = () => {
    const node = nodeDataArray.filter((node) => node.key === selectedNode.key);
    node[0].color = selectedNodeColor;
    node[0].shape = nodeShape;
    node[0].font = nodeFont + "px sans-serif";
    setSliderOpen(false);
    setNodeDataArray([...nodeDataArray]);
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
          </Grid>
        </Grid>
        <Grid item xs={11} style={{ marginTop: "2vh" }}>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <Graph
              nodeDataArray={nodeDataArray}
              linkDataArray={linkDataArray}
              openSlider={openSlider}
              saveGraph={saveGraph}
            />
          )}
        </Grid>
      </Grid>
      <Slider anchor="right" open={sliderOpen} style={{ width: "550px" }}>
        {selectedNode ? (
          <Grid
            container
            direction="column"
            style={{ minWidth: "350px" }}
            spacing={3}
          >
            <Grid item>
              <Typography variant="h5">{selectedNode.text}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Color:</Typography>
              <TextField
                variant="outlined"
                placeholder="eg:blue/#e5e5e5"
                onChange={(e) => setSelectedNodeColor(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item>
              <InputLabel id="demo-simple-select-outlined-label">
                <Typography variant="h6">Shape</Typography>
              </InputLabel>
              <Select
                style={{ minWidth: "230px" }}
                variant="outlined"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Age"
                onChange={(e) => setNodeShape(e.target.value)}
              >
                <MenuItem value="Circle">Circle</MenuItem>
                <MenuItem value="Rectangle">Rectangle</MenuItem>
                <MenuItem value="RoundedRectangle">RoundedRectangle</MenuItem>
                <MenuItem value="Ellipse">Ellipse</MenuItem>
                <MenuItem value="Diamond">Diamond</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <Typography variant="h6">Font Size:</Typography>
              <TextField
                variant="outlined"
                placeholder="Enter Font Size in number"
                onChange={(e) => setNodeFont(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={updateNodeProperties}>
                Update Node
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Slider>
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
