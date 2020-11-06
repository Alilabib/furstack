import axios from "axios";

const serverConfig = {
  baseURL: "http://18.216.189.80:8888/api",
  //baseURL: 'https://api.fursatak.app/api',
  // baseURL: "http://localhost:8888/api",
  responseType: "json",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  validateStatus: function (status) {
    return status <= 500;
  },
};

export const server = axios.create(serverConfig);
