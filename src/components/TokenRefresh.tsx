import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function calculateTokenExpiration(accessToken: string) {
  const tokenParts = accessToken.split(".");
  if (tokenParts.length !== 3) {
    return 0;
  }

  const payloadBase64 = tokenParts[1];
  const decodedPayload = atob(payloadBase64);
  const payloadObj = JSON.parse(decodedPayload);

  if (!payloadObj.exp) {
    return 0;
  }

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const expirationInSeconds = payloadObj.exp - currentTimeInSeconds;

  return expirationInSeconds;
}

const TokenRefresh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const REFRESH_TOKEN = localStorage.getItem("refreshToken");

  const refresh = async () => {
    try {
      const res = await axios.post(`${SERVER_URL}/auth/refresh`, {
        refreshToken: REFRESH_TOKEN,
      });
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
    } catch (error) {
      console.log(error);
      navigate("/error-400");
      return;
    }
  };

  useEffect(() => {
    if (!ACCESS_TOKEN) {
      if (
        location.pathname !== "/oauth/callback/kakao" &&
        location.pathname !== "/oauth/callback/kakao/" &&
        location.pathname !== "/" &&
        location.pathname.length !== 9
      ) {
        navigate("/error-400");
        return;
      }
    } else {
      const EXPIRATION_TIME = calculateTokenExpiration(ACCESS_TOKEN as string);
      if (EXPIRATION_TIME <= 300) {
        refresh();
      }
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return null;
};

export default TokenRefresh;
