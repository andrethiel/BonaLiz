import axios from "axios";
const URLBASE = process.env.NEXT_PUBLIC_API_URL;

export const createApi = (tenantId) => {
  const instance = axios.create({
    baseURL: URLBASE,
    withCredentials: true,
    headers: {
      TenantId: tenantId,
    },
  });

  const responseBody = (response) => response.data;

  return {
    get: (url) => instance.get(url).then(responseBody),
    post: (url, body) => instance.post(url, body).then(responseBody),
    postForm: (url, form) =>
      instance
        .post(url, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(responseBody),
    put: (url, body) => instance.put(url, body).then(responseBody),
    putForm: (url, form) =>
      instance
        .put(url, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(responseBody),
  };
};
