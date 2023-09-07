import axios, { AxiosResponse, AxiosError } from "axios";

// .env 파일에서 서버 URL을 가져옵니다.
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "";

// GET 요청을 수행하는 함수
export async function get<T>(
  path: string,
  token?: string
): Promise<AxiosResponse<T> | AxiosError> {
  try {
    const response = await axios.get<T>(
      `${SERVER_URL}${path}`,
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : undefined
    );
    return response;
  } catch (error) {
    return error as AxiosError;
  }
}

// POST 요청을 수행하는 함수
export async function post<T, U>(
  path: string,
  data: U,
  token: string
): Promise<AxiosResponse<T> | AxiosError> {
  try {
    const response = await axios.post<T>(`${SERVER_URL}${path}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error as AxiosError;
  }
}

// PUT 요청을 수행하는 함수
export async function put<T, U>(
  path: string,
  data: U,
  token: string
): Promise<AxiosResponse<T> | AxiosError> {
  try {
    const response = await axios.put<T>(`${SERVER_URL}${path}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error as AxiosError;
  }
}

// PATCH 요청을 수행하는 함수
export async function patch<T, U>(
  path: string,
  data: U,
  token: string
): Promise<AxiosResponse<T> | AxiosError> {
  try {
    const response = await axios.patch<T>(`${SERVER_URL}${path}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error as AxiosError;
  }
}

// DELETE 요청을 수행하는 함수
export async function del<T>(
  path: string,
  token: string
): Promise<AxiosResponse<T> | AxiosError> {
  try {
    const response = await axios.delete<T>(`${SERVER_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error as AxiosError;
  }
}
