import axios from "axios";
const axiosInstance = axios.create({});

export const apiConnect = (method, url, body, header, param, baseurl) => {
  return axiosInstance({
    method: `${method}`,
    baseURL: baseurl ? baseurl : process.env.REACT_APP_BACKEND_URL,
    url: `${url}`,
    headers: header ? header : null,
    params: param ? param : null,
    data: body ? body : null,
    timeout: 20000,
  });
};
