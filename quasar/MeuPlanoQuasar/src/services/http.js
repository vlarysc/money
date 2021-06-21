import axios from "axios";
import {
  config,
  //   handleRequestSuccess,
  //   handleResponseSuccess,
  // token,
  errorHandler
} from "./config";

export const http = axios.create({
  baseURL: process.env.VUE_APP_API,
  ...config
});

export const BasicAuth = {
  "Content-Type": "multipart/form-data",
  auth: {
    username: "at2d",
    password: "at2d"
  }
};
import { userKey } from "../shared/global";

export const tokenBearer = () => {
  const token = !!sessionStorage.getItem(userKey)
    ? JSON.parse(sessionStorage.getItem(userKey)).token
    : "";

  return {
    headers: {
      Authorization: "Bearer " + token
    }
  };
};

// http.interceptors.request.use(request => {
//   handleRequestSuccess(request)
//   return request
// })

http.interceptors.response.use(
  response => {
    // handleResponseSuccess(response)
    return response;
  },
  function handleError(error) {
    errorHandler(error);

    return Promise.reject(error.response);
  }
);
