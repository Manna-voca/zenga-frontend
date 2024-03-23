import { END_POINTS, REFRESH_TOKEN, SERVER_URL } from "../constants/apis";
import axios from "axios";

import type { TokenData } from "../types/login";
import type { ResponseData } from "../types/response";

export const fetchNewToken = async (): Promise<TokenData> => {
  const { data } = await axios.post<ResponseData<TokenData>>(
    SERVER_URL + END_POINTS.AUTH_REFRESH,
    {
      refreshToken: `${localStorage.getItem(REFRESH_TOKEN)}`,
    }
  );
  return data.data;
};
