import { ACCESS_TOKEN, REFRESH_TOKEN, STATUS_CODE } from "../constants/apis";
import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import { fetchNewToken } from "./fetchNewToken";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 5000,
  withCredentials: true,
});

const addToken = (config: InternalAxiosRequestConfig) => {
  if (!config.headers || config.headers.Authorization) return config;

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken) {
    console.log("No access token found");
    window.location.href = "/error-400";
  }

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

interface ResponseDataType {
  errorCode: number;
  message: string;
}

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const handleExpiredToken = async (error: AxiosError<ResponseDataType>) => {
  if (!error.response) return Promise.reject(error);

  const originalRequest = error.config as AxiosRequestConfigWithRetry;

  if (!originalRequest || !originalRequest.headers)
    return Promise.reject(error);

  const { data } = error.response;

  if (data.errorCode === STATUS_CODE.EXPIRED && !originalRequest._retry) {
    try {
      originalRequest._retry = true; // 무한루프 되지 않도록
      const { accessToken, refreshToken } = await fetchNewToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    } catch (refreshError) {
      console.log(refreshError);
    } finally {
      originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
        ACCESS_TOKEN
      )}`;
      return axiosInstance(originalRequest);
    }
  }

  if (data.errorCode === STATUS_CODE.INVALID_TOKEN) {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    throw new Error(data.message);
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(addToken);

axiosInstance.interceptors.response.use(
  (response) => response,
  handleExpiredToken
);
