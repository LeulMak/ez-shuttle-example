import axios from "axios";

/* This code snippet is creating an Axios instance named `axiosInstance` with specific configurations.
The `axios.create()` method is used to create a new Axios instance with a custom configuration. */
export const axiosInstanceForCDN = axios.create({
  baseURL: "https://cdn.ezshuttle.co.za/adhoc/wl/config/",
  withCredentials: false,
});

export const axiosInstance = axios.create({
  baseURL: "https://api.ezshuttle.co.za/ezx",
  withCredentials: false,
});

/* `export const axiosInstanceWithCred = axios.create({
  baseURL: "https://api.ezshuttle.co.za/ezx",
  withCredentials: true,
});` */
export const axiosInstanceWithCred = axios.create({
  baseURL: "https://api.ezshuttle.co.za/ezx",
  withCredentials: true,
});
