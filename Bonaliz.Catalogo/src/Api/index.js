import axios from "axios";

const URLBASE = process.env.NEXT_PUBLIC_API_URL;
const apiKey = "43e4dbf0-52ed-4203-895d-42b586496bd4";

axios.defaults.baseURL = URLBASE;

axios.defaults.headers.common = {
  "X-API-Key": apiKey,
};

const responseBody = (response) => response.data;

const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
};

const Api = {
  request,
};

export default Api;
