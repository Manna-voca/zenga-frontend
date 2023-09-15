/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import styled from "@emotion/styled";
import { color } from "../styles/color";
import whaleCharacter6 from "../assets/images/whale_character6.png";
import whaleCharacter7 from "../assets/images/whale_character7.png";
import progressWhaleIcon from "../assets/icons/ic-progressWhale.svg";
import { typography } from "../styles/typography";
import duplicateIcon from "../assets/icons/ic-duplicate.svg";
import SendPraise from "../components/SendPraise";
import PraiseContainer from "../components/PraiseContainer";
import Toast from "../components/Toast";
import { useParams } from "react-router";
import axios from "axios";

interface CategoryProps {
  categoryName: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryWrapper = ({
  categoryName,
  isSelected,
  onClick,
}: CategoryProps) => {
  return (
    <CategoryBtn
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? `${color.primary500}` : "",
        border: isSelected ? `1px solid ${color.primary500}` : "",
        color: isSelected ? `${color.onPrimaryActive}` : "",
      }}
    >
      {categoryName}
    </CategoryBtn>
  );
};

interface MemberCountProgressBarProps {
  memberCount: number;
}

const MemberCountProgressBar = ({
  memberCount,
}: MemberCountProgressBarProps) => {
  const gradientDivWidth = memberCount * 23.5;
  const whaleLeft = -16 + memberCount * 23.5;
  const countLeft = memberCount * 23.5 - 4;

  return (
    <div
      style={{
        width: "275px",
        height: "60px",
        boxSizing: "border-box",
        padding: "5px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "12px",
        marginBottom: "120px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "20px",
          backgroundColor: `${color.divider}`,
          borderRadius: "100px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            background: `linear-gradient(270deg, ${color.primary} 0%, #D3EAFF 100%)`,
            width: `${gradientDivWidth}px`,
            height: "20px",
            borderRadius: "100px",
          }}
        ></div>
        <div
          style={{
            top: "-6px",
            left: `${whaleLeft}px`,
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: `${color.primary500}`,
          }}
        >
          <img src={progressWhaleIcon} alt="" />
        </div>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          marginTop: "5px",
          color: `${color.onSurfaceDisabled}`,
          ...typography.body3Medium,
        }}
      >
        <span style={{ position: "absolute", left: "0px" }}>0</span>
        <span style={{ position: "absolute", left: `${countLeft}px` }}>
          {memberCount}
        </span>
        <span style={{ position: "absolute", right: "0px" }}>10</span>
      </div>
    </div>
  );
};

interface ChannelCodeProps {
  channelCode: string;
  setIsDuplicateSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setToastState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChannelCode = ({
  channelCode,
  setIsDuplicateSuccess,
  setToastState,
}: ChannelCodeProps) => {
  const userAgent = navigator.userAgent;

  const handleDuplicateImgClick = async () => {
    try {
      await navigator.clipboard.writeText(channelCode);
      if (userAgent.match(/Android/i)) {
      } else {
        setIsDuplicateSuccess(true);
        setToastState(true);
      }
    } catch (e) {
      setIsDuplicateSuccess(false);
      setToastState(true);
    }
  };

  return (
    <div
      style={{
        margin: "0 20px 100px 20px",
        padding: "15px 20px",
        height: "47px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: `${color.surface}`,
        borderRadius: "8px",
        gap: "24px",
      }}
    >
      <div
        style={{
          color: `${color.onSurfaceDefault}`,
          display: "flex",
          gap: "16px",
        }}
      >
        <span style={{ ...typography.body1Semibold }}>채널 코드</span>
        <span style={{ ...typography.body1Regular }}>{channelCode}</span>
      </div>
      <img
        onClick={handleDuplicateImgClick}
        src={duplicateIcon}
        alt="복사하기"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

const Praise = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [isChannelActive, setIsChannelActive] = useState<boolean>(true);
  const [toastState, setToastState] = useState<boolean>(false);
  const [isDuplicateSuccess, setIsDuplicateSuccess] = useState<boolean>(false);
  const [memberCount, setMemberCount] = useState<number>(0);
  const { channelCode } = useParams();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const CONFIG = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };

  const handleCategory1Click = async () => {
    setSelectedCategory(1);
  };
  const handleCategory2Click = async () => {
    setSelectedCategory(2);
  };
  const handleCategory3Click = async () => {
    setSelectedCategory(3);
  };

  const fetchChannelIdAndValidity = async () => {
    try {
      const infoResponse = await axios.get(
        `${SERVER_URL}/channels/info?code=${channelCode}`,
        CONFIG
      );
      if (infoResponse.data && infoResponse.data.data) {
        const channelId = infoResponse.data.data.id;
        localStorage.setItem("channelId", channelId);
        const validityResponse = await axios.get(
          `${SERVER_URL}/channels/${channelId}/validity`,
          CONFIG
        );
        if (validityResponse.data) {
          if (validityResponse.data.data.isValid === true) {
            setIsChannelActive(true);
          } else {
            setMemberCount(validityResponse.data.data.memberCount);
            setIsChannelActive(false);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChannelIdAndValidity();
  }, []);

  return (
    <>
      <Header type="common" isChannelAdmin={true}></Header>
      <CategoryContainer>
        <CategoryWrapper
          categoryName="칭찬보내기"
          isSelected={selectedCategory === 1}
          onClick={handleCategory1Click}
        />
        <CategoryWrapper
          categoryName="받은칭찬"
          isSelected={selectedCategory === 2}
          onClick={handleCategory2Click}
        />
        <CategoryWrapper
          categoryName="보낸칭찬"
          isSelected={selectedCategory === 3}
          onClick={handleCategory3Click}
        />
        {/* <CategoryBtn
          onClick={() => setIsChannelActive((prev) => !prev)}
          style={{ background: isChannelActive ? `${color.primary500}` : "" }}
        >
          {isChannelActive ? "on" : "off"}
        </CategoryBtn> */}
      </CategoryContainer>
      {selectedCategory === 1 ? (
        isChannelActive ? (
          <SendPraise />
        ) : (
          <>
            <div css={inactiveCategoryDivStyle}>
              <img width="72px" src={whaleCharacter6} alt="" />
              <span css={inactiveCategorySpanStyle}>
                Zenga를 시작하기 위해서는
                <br />
                <b>최소 10명</b>이 모여야 해요
              </span>
              <MemberCountProgressBar memberCount={memberCount} />
            </div>
            <ChannelCode
              channelCode={channelCode ? channelCode : ""}
              setIsDuplicateSuccess={setIsDuplicateSuccess}
              setToastState={setToastState}
            />
            {toastState && (
              <Toast
                type={isDuplicateSuccess ? "O" : "X"}
                text="코드 복사에 성공했어요!"
                func={() => setToastState(false)}
              ></Toast>
            )}
          </>
        )
      ) : null}
      {selectedCategory === 2 ? (
        isChannelActive ? (
          <PraiseContainer isGetNotPost={true} />
        ) : (
          <div css={inactiveCategoryDivStyle}>
            <img width="72px" src={whaleCharacter7} alt="" />
            <span css={inactiveCategorySpanStyle}>
              아직 <b>받은 칭찬</b>이 없어요
            </span>
          </div>
        )
      ) : null}
      {selectedCategory === 3 ? (
        isChannelActive ? (
          <PraiseContainer isGetNotPost={false} />
        ) : (
          <div css={inactiveCategoryDivStyle}>
            <img width="72px" src={whaleCharacter7} alt="" />
            <span css={inactiveCategorySpanStyle}>
              아직 <b>보낸 칭찬</b>이 없어요
            </span>
          </div>
        )
      ) : null}
      <Navbar></Navbar>
    </>
  );
};

export default Praise;

const CategoryContainer = styled.div`
  padding: 0 0 0 20px;
  margin-top: 12px;
  display: flex;
  gap: 10px;
`;

const CategoryBtn = styled.button`
  background-color: ${color.background};
  border: 1px solid ${color.outline};
  border-radius: 100px;
  padding: 0 14px;
  height: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: ${color.onSurfaceMuted};
  cursor: pointer;
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
