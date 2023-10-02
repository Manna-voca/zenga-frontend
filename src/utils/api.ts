import axios from "axios";
import { ACCESS_TOKEN, calculateTokenExpiration, getToken } from "./token";

const instance = axios.create({});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = getToken(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken || !refreshToken) {
      window.location.href = "/error-400";
      return config;
    } else {
      const EXP_TIME = await calculateTokenExpiration(accessToken);
      if (EXP_TIME <= 300) {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/auth/refresh`,
            {
              refreshToken: refreshToken,
            }
          );
          localStorage.setItem("accessToken", res.data.data.accessToken);
          localStorage.setItem("refreshToken", res.data.data.refreshToken);
          console.log(res.data.data.accessToken);
          window.location.reload();
          console.log("refreshComplete");
        } catch (error) {
          console.log(error);
          window.location.href = "/error-400";
        } finally {
          return config;
        }
      }
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
