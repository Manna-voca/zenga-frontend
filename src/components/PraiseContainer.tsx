/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import PraiseWrapper from "./PraiseWrapper";
import axios from "axios";
import { color } from "../styles/color";
import { typography } from "../styles/typography";
import whaleCharacter7 from "../assets/images/whale_character7.png";
import xIcon from "../assets/icons/ic-x32.svg";
import checkboxIcon from "../assets/icons/ic-checkbox.svg";
import checkedboxIcon from "../assets/icons/ic-checkedbox.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/sendpraiseSwiper.css";
import pointIcon from "../images/points.svg";
import modalImage1 from "../assets/images/receivePraiseModal1.png";
import modalImage2 from "../assets/images/receivePraiseModal2.png";
import whaleClock from "../assets/images/whale-clock.png";
import sendPraiseModalImage from "../assets/images/sendPraiseModal.png";
import Popup2 from "./Popup2";

interface OwnProps {
  isGetNotPost: boolean;
}

interface PraiseProps {
  memberPraiseId: number;
  praiseDescription: string;
  memberId: string | null;
  memberName: string;
  memberProfileImageUrl: string;
  praiseType: string;
  isOpened: boolean;
}

const PraiseContainer = ({ isGetNotPost }: OwnProps) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const CONFIG = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };
  const CHANNEL_ID = localStorage.getItem("channelId");
  const [isLoading, setIsLoading] = useState(true);
  const [newPraiseOpened, setNewPraiseOpened] = useState(false);
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [firstModalNeverShow, setFirstModalNeverShow] = useState(false);

  const blockColor = (praiseType: string) => {
    switch (praiseType) {
      case "OTHERS":
        return "Blue";
      case "PASSION":
        return "Yellow";
      case "APPEARANCE":
        return "Pink";
      case "PERSONALITY":
        return "Orange";
      case "ABILITY":
        return "Green";
      default:
        return "Default";
    }
  };

  const [receivePraiseList, setReceivePraiseList] =
    useState<Array<PraiseProps> | null>();
  const [sendPraiseList, setSendPraiseList] =
    useState<Array<PraiseProps> | null>();

  const praiseList = isGetNotPost ? receivePraiseList : sendPraiseList;

  const fetchPraiseData = async () => {
    try {
      if (isGetNotPost === true) {
        const res = await axios.get(
          `${SERVER_URL}/praise/receive?channelId=${CHANNEL_ID}`,
          CONFIG
        );
        setReceivePraiseList(res.data.data.content);
      } else {
        const res = await axios.get(
          `${SERVER_URL}/praise/send?channelId=${CHANNEL_ID}`,
          CONFIG
        );
        setSendPraiseList(res.data.data.content);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchModalInfo = async () => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/members/modal/${localStorage.getItem("channelId")}`,
        CONFIG
      );
      setShowFirstModal(res.data.data.pointModal);
    } catch (err) {
      console.log(err);
    }
  };

  const firstModalCloseOnClick = async () => {
    try {
      if (firstModalNeverShow) {
        await axios.patch(
          `${SERVER_URL}/members/modal/point/${localStorage.getItem(
            "channelId"
          )}`,
          {},
          CONFIG
        );
      }
      setShowFirstModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchModalInfo()
    fetchPraiseData().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchPraiseData().then(() => setIsLoading(false));
  }, [newPraiseOpened]);

  return (
    <>
      <PraiseContainerDiv>
        {isLoading ? (
          <LoadingDiv>
            <LoadingSpinner />
          </LoadingDiv>
        ) : praiseList?.length === 0 ? (
          <div css={inactiveCategoryDivStyle}>
            <img width="72px" src={whaleCharacter7} alt="" />
            <span css={inactiveCategorySpanStyle}>
              아직 <b>{isGetNotPost ? "받은" : "보낸"} 칭찬</b>이 없어요
            </span>
          </div>
        ) : (
          praiseList?.map((praise, index) => {
            return (
              <PraiseWrapper
                memberId={praise.memberId}
                handlePraiseOpen={() => setNewPraiseOpened((prev) => !prev)}
                praiseId={praise.memberPraiseId}
                key={index}
                isGetNotPost={isGetNotPost}
                content={praise.praiseDescription}
                image={praise.memberProfileImageUrl}
                name={praise.memberName}
                type={blockColor(praise.praiseType)}
                isOpened={praise.isOpened}
              />
            );
          })
        )}
      </PraiseContainerDiv>
      {(isGetNotPost && showFirstModal) && (
        <FirstModal
          firstModalNeverShow={firstModalNeverShow}
          setFirstModalNeverShow={setFirstModalNeverShow}
          firstModalCloseOnClick={firstModalCloseOnClick}
        />
      )}
    </>
  );
};

export default PraiseContainer;

const PraiseContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px 60px;
  margin-top: 20px;
`;

const LoadingDiv = styled.div`
  height: 113px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid ${color.surface};
  border-top-color: ${color.primary300};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
const inactiveCategoryDivStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  gap: 20px;
`;

const inactiveCategorySpanStyle = css`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: ${color.onSurfaceActive};
  text-align: center;
`;

interface FirstModalProps {
  firstModalNeverShow: boolean;
  setFirstModalNeverShow: React.Dispatch<React.SetStateAction<boolean>>;
  firstModalCloseOnClick: () => void;
}

const FirstModal = ({
  firstModalNeverShow,
  setFirstModalNeverShow,
  firstModalCloseOnClick,
}: FirstModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "1",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "2",
          width: "calc(100% - 85px)",
          maxWidth: "415px",
          // height: "360px",
          backgroundColor: `${color.background}`,
          borderRadius: "16px",
          padding: "12px 12px 28px 12px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", textAlign: "end" }}>
          <img
            onClick={firstModalCloseOnClick}
            src={xIcon}
            alt=""
            style={{ cursor: "pointer" }}
          />
        </div>
        <Swiper
          style={{ width: "100%", height: "288px" }}
          pagination={{ clickable: true }}
          mousewheel
          keyboard
          modules={[Pagination, Mousewheel, Keyboard]}
          allowTouchMove
        >
          <MySwiperSlide>
            <div css={firstPraiseModalPstyle} style={{ marginBottom: "28px" }}>
              익명으로 받은 <b>칭찬을</b>
              <br />{" "}
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{ marginRight: "4px" }}
                  width="15px"
                  src={pointIcon}
                  alt=""
                />
                <b>포인트로 확인</b>해 보세요!
              </div>
            </div>
            <img width={"240px"} src={modalImage1} alt="" />
            <span
              style={{
                ...typography.caption1Regular,
                color: `${color.onSurfaceMuted}`,
                marginTop: "6px",
              }}
            >
              포인트는 모든 채널에서 사용할 수 있어요
            </span>
          </MySwiperSlide>
          <MySwiperSlide>
            <div css={firstPraiseModalPstyle} style={{ marginBottom: "28px" }}>
              익명으로 받은 <b>칭찬을</b>
              <br />{" "}
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{ marginRight: "4px" }}
                  width="15px"
                  src={pointIcon}
                  alt=""
                />
                <b>포인트로 확인</b>해 보세요!
              </div>
            </div>
            <img
              width="240px"
              src={modalImage2}
              alt=""
              style={{ paddingLeft: "20px" }}
            />
            <span
              style={{
                ...typography.caption1Regular,
                color: `${color.onSurfaceMuted}`,
                marginTop: "26px",
              }}
            >
              포인트는 모든 채널에서 사용할 수 있어요
            </span>
          </MySwiperSlide>
        </Swiper>
        <div
          onClick={() => setFirstModalNeverShow((prev) => !prev)}
          style={{
            cursor: "pointer",
            position: "absolute",
            bottom: "-30px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
            color: "#FFF",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "150%",
          }}
        >
          <img
            src={firstModalNeverShow ? checkedboxIcon : checkboxIcon}
            alt=""
          />
          다시 보지 않기
        </div>
      </div>
    </div>
  );
};

const MySwiperSlide = styled(SwiperSlide)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const firstPraiseModalPstyle = css`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
`;
