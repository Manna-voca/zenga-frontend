import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function calculateTokenExpiration(accessToken: string) {
  const tokenParts = accessToken.split(".");
  if (tokenParts.length !== 3) {
    return 0;
  }

  const payloadBase64 = tokenParts[1];
  const decodedPayload = atob(payloadBase64);
  const payloadObj = JSON.parse(decodedPayload);

  if (!payloadObj.exp) {
    // JWT에 만료 시간이 없는 경우 0을 반환하거나 오류 처리를 수행할 수 있습니다.
    return 0;
  }

  // 현재 시간을 초 단위로 가져오기
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  // JWT의 만료 시간을 가져와서 남은 시간을 계산
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
    }
  };

  useEffect(() => {
    if (!ACCESS_TOKEN) {
      if (
        location.pathname !== "/oauth/callback/kakao" &&
        location.pathname !== "/" &&
        location.pathname.length !== 9
      ) {
        alert("세션이 만료되었습니다.");
        navigate("/");
      }
      return;
    }

    const EXPIRATION_TIME = calculateTokenExpiration(ACCESS_TOKEN as string);
    if (EXPIRATION_TIME <= 300) {
      refresh();
    }
  }, [location.pathname]);
  return null;
};

export default TokenRefresh;
