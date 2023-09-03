/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { color } from "../styles/color";
import { typography } from "../styles/typography";

const Login = () => {
  const navigate = useNavigate();

  const goCreateChannel = () => {
    navigate("/create-channel");
  };

  return (
    <>
      <div style={{ marginTop: "20px", ...typography.heading1Semibold }}>
        젠가 ^^
      </div>
      <button css={buttonStyles} onClick={goCreateChannel}>
        서비스 온보딩
      </button>
      <button css={buttonStyles} onClick={goCreateChannel}>
        채널 홈으로
      </button>
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
