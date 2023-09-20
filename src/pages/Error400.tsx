import React from "react";
import Header from "../components/Header";
import xWhale from "../assets/images/x_whale_character.png";
import { typography } from "../styles/typography";
import { color } from "../styles/color";
import { useNavigate } from "react-router-dom";

const Error400 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header type="back" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "162px",
          ...typography.body1Regular,
          color: `${color.onSurfaceActive}`,
        }}
      >
        <img width={"72px"} src={xWhale} alt="404_whale" />
        <span style={{ margin: "20px 0 60px" }}>세션이 만료되었습니다</span>
        <div
          onClick={() => {
            navigate("/", { replace: true });
          }}
          style={{
            ...typography.body2Semibold,
            color: `${color.onPrimaryActive}`,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "calc(100% - 94px)",
            backgroundColor: `${color.primary500}`,
            height: "44px",
            borderRadius: "30px",
          }}
        >
          로그인하러 가기
        </div>
      </div>
    </>
  );
};

export default Error400;
