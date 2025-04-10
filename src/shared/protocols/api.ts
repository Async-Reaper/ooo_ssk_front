import axios from "axios";

// export const __API__: string = process.env.REACT_APP_API_DOMAIN || "http://agit.su:8395";
// export const __API__: string = process.env.REACT_APP_API_DOMAIN || "http://192.168.95.226:8395";
export const __API__: string = process.env.REACT_APP_API_DOMAIN || "http://192.168.95.226:1313";

export const $api = axios.create({
  baseURL: __API__,
  withCredentials: false,
});
