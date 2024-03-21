/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect } from "react";
import { color } from "../styles/color";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KaKao = () => {
  const navigate = useNavigate();
  const authcode = new URL(window.location.href).searchParams.get("code");
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const fetchTokenByKaKaoAuthCode = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/auth/login/kakao?code=${authcode}`
      );
      if (response.data && response.data.data) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        const userInfoResponse = await axios.get(`${SERVER_URL}/users/info`, {
          headers: {
            Authorization: `Bearer ${response.data.data.accessToken}`,
          },
        });
        // if(에러땜시왔다는 로컬스토리지에 플래그 있으면){
        //   navigate(-3);
        // }
        if (userInfoResponse.data.data.name) {
          navigate("/channel-home");
        } else {
          navigate("/onboarding");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTokenByKaKaoAuthCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        css={spinnerStyle}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: `3px solid ${color.surface}`,
          borderTopColor: `${color.primary500}`,
        }}
      ></div>
    </div>
  );
};

export default KaKao;

const spinnerAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const spinnerStyle = css`
  animation: ${spinnerAnimation} 1s linear infinite;
`;
