import axios from "axios";

const URLBASE = process.env.NEXT_PUBLIC_API_URL;
// axios.defaults.baseURL = "https://bonaliz.runasp.net/";

axios.defaults.baseURL = URLBASE;

const responseBody = (response) => response.data;

const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  postForm: (url, form) =>
    axios
      .post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  putForm: (url, form) =>
    axios
      .put(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(responseBody),
};

const Api = {
  request,
};

export default Api;
