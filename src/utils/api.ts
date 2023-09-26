import axios from "axios";
import { ACCESS_TOKEN, refresh } from "./token";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    switch (error.response?.data.errorCode) {
      case 7000:
        await refresh();
        break;
      case 7002:
        window.location.href = "/error-400";
        break;
      default:
        console.log(error);
        console.log("default");
        return;
    }
    return Promise.reject(error);
  }
);

export default instance;
