import axios from "axios";

const setAllProjects = (allProjects) => {
  return {
    type: "PROJECTS",
    allProjects,
  };
};

export const allProjects = () => async (dispatch) => {
  try {
    const url = "/projects";
    const response = await axios.get(url);
    dispatch(setAllProjects(response.data.body.allProjects));
  } catch (error) {
    console.log(error);
  }
};

export const newProject = (title) => async (dispatch) => {
  try {
    const url = "/projects";
    const data = { title };
    const response = await axios.post(url, data);
    await dispatch(allProjects());
    return {
      responseStatus: response.status,
      projectId: response.data.body.projectId,
    };
  } catch (error) {
    console.log(error);
  }
};

const setProjectDetail = (project) => {
  return {
    type: "PROJECT_DETAIL",
    project,
  };
};

export const getProjectDetail = (projectId) => async (dispatch) => {
  try {
    const url = `/project/${projectId}`;
    const response = await axios.get(url);
    dispatch(setProjectDetail(response.data.body.project));
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const saveProjectDetail =
  (projectId, nodeDataArray, linkDataArray) => async (dispatch) => {
    try {
      const url = `/project/${projectId}`;
      const data = {
        nodeDataArray,
        linkDataArray,
      };
      await axios.put(url, data);
    } catch (error) {
      console.log(error);
    }
  };
