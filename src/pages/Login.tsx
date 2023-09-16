/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { color } from "../styles/color";
import { typography } from "../styles/typography";
import axios from "axios";
import styled from "@emotion/styled";
import kakaoIcon from "../assets/icons/ic-kakao.svg";
import { get } from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  let KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  // const fetchUserInfo = async () => {
  //   try {
  //     const response = await get(
  //       "/users/info",
  //       `${localStorage.getItem("accessToken")}`
  //     );
  //     if (response instanceof Error) {
  //       console.error("Error:", response);
  //     } else {
  //       console.log("Data:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // fetchUserInfo();

  return (
    <>
      <div style={{ marginTop: "20px", ...typography.heading1Semibold }}>
        젠가
      </div>
      <button css={buttonStyles} onClick={() => navigate("/onboarding")}>
        서비스 온보딩
      </button>
      <button css={buttonStyles} onClick={() => {navigate("/channel-home"); localStorage.setItem("accessToken", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM0OTI4MDMsImV4cCI6MTg5MzUyODgwMywic3ViIjoiMSIsIlRPS0VOX1RZUEUiOiJBQ0NFU1NfVE9LRU4ifQ.5-E7dQeUqr91r2mIRJGOO2latbYbK-MbUuiYRC0rvP0");}}>
        채널 홈으로
      </button>
      <KaKaoLogin href={KAKAO_URL}>
        <img src={kakaoIcon} alt="" />
        카카오 로그인
      </KaKaoLogin>
    </>
  );
};

export default Login;

const buttonStyles = css`
  font-family: Pretendard;
  font-size: 20px;
  width: 100%;
  color: ${color.onSecondaryActive};
  background-color: ${color.primary500};
  padding: 20px;
  border: none;
  display: block;
  margin-top: 40px;
  border-radius: 10px;
`;

const KaKaoLogin = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  background-color: rgba(254, 229, 0, 1);
  margin: 40px auto 0;
  padding: 0;
  border: none;
  width: calc(100% - 45px);
  min-width: 300px;
  max-width: 455px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
`;
