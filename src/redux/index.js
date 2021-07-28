import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import userStore from "./user/store";
import projectStore from "./projects/store";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

axios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const allStores = combineReducers({
  userStore,
  projectStore,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(allStores, composedEnhancer);

export default store;
