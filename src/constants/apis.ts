export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const END_POINTS = {
  AUTH_REFRESH: "/auth/refresh",
} as const;
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const STATUS_CODE = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  INVALID_TOKEN: 7000,
  EXPIRED: 7001,
};
