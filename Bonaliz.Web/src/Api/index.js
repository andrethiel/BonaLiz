import axios from "axios";

axios.defaults.baseURL = "https://localhost:7166";

const responseBody = (response) => response.data;

const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
};

const Api = {
  request,
};

export default Api;
