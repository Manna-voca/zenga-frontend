/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import PraiseWrapper from "./PraiseWrapper";
import axios from "axios";
import { color } from "../styles/color";
import whaleCharacter7 from "../assets/images/whale_character7.png";
import Popup2 from "./Popup2";

interface OwnProps {
  isGetNotPost: boolean;
}

interface PraiseProps {
  content: string;
  image?: string;
  name: string;
  type: "Blue" | "Yellow" | "Green" | "Purple" | "Orange" | "Pink" | "Default";
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

  const [receivePraiseList, setReceivePraiseList] = useState([
    {
      memberPraiseId: -1,
      isOpened: false,
      praiseDescription: "",
      memberName: "",
      memberProfileImageUrl: "",
      praiseType: "",
    },
  ]);
  const [sendPraiseList, setSendPraiseList] = useState([
    {
      memberPraiseId: -1,
      praiseDescription: "",
      memberName: "",
      memberProfileImageUrl: "",
      praiseType: "",
      isOpened: true,
    },
  ]);

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

  useEffect(() => {
    fetchPraiseData().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchPraiseData().then(() => setIsLoading(false));
  }, [newPraiseOpened])

  return (
    <PraiseContainerDiv>
      {isLoading ? (
        <LoadingDiv>
          <LoadingSpinner />
        </LoadingDiv>
      ) : praiseList.length === 0 ? (
        <div css={inactiveCategoryDivStyle}>
          <img width="72px" src={whaleCharacter7} alt="" />
          <span css={inactiveCategorySpanStyle}>
            아직 <b>{isGetNotPost ? "받은" : "보낸"} 칭찬</b>이 없어요
          </span>
        </div>
      ) : (
        praiseList.map((praise, index) => {
          return (
            <PraiseWrapper
              handlePraiseOpen={() => setNewPraiseOpened(prev => !prev)}
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
