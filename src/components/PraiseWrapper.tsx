/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { color } from "../styles/color";
import smallWhale from "../assets/images/smallWhale.png";
import CircularImage from "./CircularImage";
import axios from "axios";
import Popup2 from "./Popup2";

interface PraiseProps {
  handlePraiseOpen: () => void;
  praiseId: number;
  isGetNotPost: boolean;
  content: string;
  image?: string;
  isOpened?: boolean;
  name: string;
  type: "Blue" | "Yellow" | "Green" | "Purple" | "Orange" | "Pink" | "Default";
}

const PraiseWrapper = ({
  handlePraiseOpen,
  praiseId,
  isGetNotPost,
  isOpened,
  content,
  image,
  name,
  type,
}: PraiseProps) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const CONFIG = {
    headers: {
      // Authorization: "Bearer " + localStorage.getItem("accessToken"),
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM5MjA3MTAsImV4cCI6MTY5NzUyMDcxMCwic3ViIjoiMSIsIlRPS0VOX1RZUEUiOiJBQ0NFU1NfVE9LRU4ifQ.IT2kHS9XkWMI_Q92nrYmaKHtq8qlb_f55bWqQBP09JI",
    },
  };
  const CHANNEL_ID = localStorage.getItem("channelId");
  const blockType = `block${type}`;
  const blockImagePath = `/assets/ic-${blockType}.svg`;
  const defaultMessage = isGetNotPost
    ? " 질문에 나를 선택한 사람은"
    : " 질문에 내가 선택한 사람은";
  const imageNameStyle =
    isGetNotPost === false
      ? postImageNameStyle
      : isOpened === false
      ? getImageNameStyle
      : postImageNameStyle;
  const profileImagePath = image ? image : smallWhale;
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const getSenderOfPraise = async () => {
    try {
      if (isGetNotPost === true && isOpened === false) {
        const res = await axios.patch(
          `${SERVER_URL}/praise/open`,
          {
            channelId: CHANNEL_ID,
            memberPraiseId: praiseId,
          },
          CONFIG
        );
        if (res.data.errorCode === 1200) {
          alert("포인트가 부족합니다.");
        } else {
          handlePraiseOpen();
          setShowPopup(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showPopup && (
        <Popup2
          leftBtnText="취소"
          rightBtnText="확인"
          title="포인트를 차감하시겠어요?"
          text="포인트 차감 시, 보낸 멤버가 누구인지 알 수 있어요"
          leftFunc={() => setShowPopup(false)}
          rightFunc={() => getSenderOfPraise()}
        />
      )}
      <PraiseWrapperDiv>
        <img width="21px" height="21px" src={blockImagePath} alt="" />
        <PraiseContentDiv>
          <B>{content}</B>
          {defaultMessage}
        </PraiseContentDiv>
        <div onClick={() => setShowPopup(true)} css={imageNameStyle}>
          <CircularImage size="24" image={profileImagePath} />
          {name}
        </div>
      </PraiseWrapperDiv>
    </>
  );
};

export default PraiseWrapper;

const PraiseWrapperDiv = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 300px;
  height: 88px;
  padding: 10px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: ${color.surface};
  gap: 6px;
`;
const PraiseContentDiv = styled.p`
  color: ${color.onSurfaceDefault};
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`;
const B = styled.b`
  color: ${color.onSurfaceActive};
  font-weight: 500;
`;

const getImageNameStyle = css`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  padding: 2px 5px 2px 2px;
  align-items: center;
  border: 1px solid ${color.outline};
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  gap: 6px;
  color: ${color.onSurfaceDefault};
  cursor: pointer;
`;
const postImageNameStyle = css`
  position: absolute;
  bottom: 9px;
  right: 9px;
  display: flex;
  padding: 2px 5px 2px 2px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  gap: 6px;
  color: ${color.onSurfaceDefault};
`;
