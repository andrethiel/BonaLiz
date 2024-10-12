import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:7166";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
};

const Api = {
  request,
};

export default Api;
