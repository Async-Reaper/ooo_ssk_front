import axios from "axios";

// export const __API__: string = process.env.REACT_APP_API_DOMAIN || "http://agit.su:8395";
// export const __API__: string = process.env.REACT_APP_API_DOMAIN || "http://192.168.95.226:8395";
// export const __API__: string = process.env.REACT_APP_API_DOMAIN || "http://192.168.95.226:1313";
// export const __API__: string = process.env.REACT_APP_API_DOMAIN || "https://xn--42-1lc1aa.xn--p1ai";
export const __API__: string = process.env.REACT_APP_API_DOMAIN || "http://127.0.0.1:8000";

export const $api = axios.create({
  baseURL: __API__,
  withCredentials: true,
});
