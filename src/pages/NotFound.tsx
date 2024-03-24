import React from "react";
import Header from "../components/Header";
import _404_whale from "../assets/images/404_whale.png";
import { typography } from "../styles/typography";
import { color } from "../styles/color";
import { useNavigate } from "react-router-dom";
import refreshIcon from "../assets/icons/ic-refresh.svg";

const NotFound = ({ home }: { home?: boolean }) => {
  const navigate = useNavigate();
  const HOME_BUTTON = (
    <>
      칭찬 확인하기 <img src={refreshIcon} alt='새로 고침' />
    </>
  );

  const TEXT = () => {
    if (home) {
      return (
        <>
          칭찬을 불러오지 못했어요 <br /> 잠시 후 다시 시도해 주세요!
        </>
      );
    } else {
      return <>페이지를 찾을 수 없습니다.</>;
    }
  };

  const buttonHandler = () => {
    if (home) {
      navigate(0);
    } else {
      navigate("/channel-home", { replace: true });
    }
  };

  return (
    <>
      {!home && <Header type='back' />}
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
        <img width={"72px"} src={_404_whale} alt='404_whale' />
        <p
          style={{
            margin: "20px 0 60px",
            textAlign: "center",
          }}
        >
          <TEXT />
        </p>
        <div
          onClick={buttonHandler}
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
            gap: "8px",
          }}
        >
          {home ? HOME_BUTTON : "홈으로 돌아가기"}
        </div>
      </div>
    </>
  );
};

export default NotFound;
