import React from "react";
import Header from "../components/Header";
import _404_whale from "../assets/images/404_whale.png";
import { typography } from "../styles/typography";
import { color } from "../styles/color";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
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
        <img width={"72px"} src={_404_whale} alt="404_whale" />
        <span style={{ margin: "20px 0 60px" }}>페이지를 찾을 수 없습니다</span>
        <div
          onClick={() => {
            navigate("/channel-home", { replace: true });
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
          홈으로 돌아가기
        </div>
      </div>
    </>
  );
};

export default NotFound;
