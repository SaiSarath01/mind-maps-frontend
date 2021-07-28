import axios from "axios";

export const login = (loginDetails) => async (dispatch) => {
  try {
    const url = "/user/login";
    const response = await axios.post(url, loginDetails);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.body.token);
    }
    return { responseStatus: response.status };
  } catch (error) {
    return { responseStatus: error.response.status };
  }
};

export const register = (registerDetails) => async (dispatch) => {
  try {
    const url = "/user/register";
    const response = await axios.post(url, registerDetails);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.body.token);
    }
    return { responseStatus: response.status };
  } catch (error) {
    return { responseStatus: error.response.status };
  }
};
