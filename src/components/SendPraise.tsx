/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { color } from "../styles/color";
import { ReactComponent as ShuffleIcon } from "../assets/icons/ic-shuffle.svg";
import CircularImage from "./CircularImage";
import ex from "../assets/images/profile-1.png";
import { typography } from "../styles/typography";
import whaleCharacter4 from "../assets/images/whale_character4.png";
import whaleCharacter5 from "../assets/images/whale_character5.png";
import whaleCharacter7 from "../assets/images/whale_character7.png";
import wave from "../assets/icons/ic-wave.svg";
import Timer from "./Timer";
import rightArrowIcon from "../assets/icons/ic-rightArrow.svg";
import xIcon from "../assets/icons/ic-x32.svg";
import checkboxIcon from "../assets/icons/ic-checkbox.svg";

interface MemberProps {
  name: string;
  profileImage: string;
  isChannelAdmin: boolean;
  userId: number;
}

interface PraiseMemberWrapperProps extends MemberProps {
  selectedMember: number;
  onClick: () => void;
}

interface PraiseProps {
  content: string;
  members: MemberProps[];
  hasShuffled: boolean;
}

const PraiseMemberWrapper = ({
  name,
  profileImage,
  isChannelAdmin,
  userId,
  selectedMember,
  onClick,
}: PraiseMemberWrapperProps) => {
  const selected = selectedMember === userId;
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        width: "275px",
        height: "48px",
        padding: "6px",
        boxSizing: "border-box",
        border: selected
          ? `2px solid ${color.secondary500}`
          : `2px solid ${color.primary300}`,
        backgroundColor: selected
          ? `${color.secondary50}`
          : `${color.background}`,
        gap: "74px",
        alignItems: "center",
        borderRadius: "100px",
        cursor: "pointer",
      }}
    >
      <CircularImage
        image={profileImage}
        size="36"
        isChannelAdmin={isChannelAdmin ? true : undefined}
      />
      <span
        style={{
          color: `${color.onSurfaceActive}`,
          ...typography.heading4Regular,
        }}
      >
        {name}
      </span>
    </div>
  );
};

interface PraiseModalProps {
  onClick: () => void;
}

const PraiseModal = ({ onClick }: PraiseModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      onClick={onClick}
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
          width: "calc(100% - 45px)",
          maxWidth: "445px",
          height: "245px",
          backgroundColor: `${color.background}`,
          borderRadius: "8px",
          padding: "28px 16px 16px 16px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img width="48px" src={whaleCharacter7} alt="" />
        <h2
          style={{
            margin: "10px 0 6px 0",
            ...typography.heading4Bold,
            color: `${color.onSurfaceActive}`,
          }}
        >
          칭찬을 보냈어요
        </h2>
        <p
          style={{
            textAlign: "center",
            ...typography.body2Regular,
            color: `${color.onSurfaceDefault}`,
            marginBottom: "25px",
          }}
        >
          상대방이 포인트로 확인하기 전까지는
          <br /> 누가 보낸 칭찬인지 알 수 없어요
        </p>
        <button
          onClick={onClick}
          style={{
            padding: "0",
            width: "calc(100% - 18px)",
            height: "44px",
            backgroundColor: `${color.primary500}`,
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Pretendard",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "1.5",
            color: `${color.onPrimaryActive}`,
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

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
          height: "360px",
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
          <img onClick={firstModalCloseOnClick} src={xIcon} alt="" style={{ cursor: "pointer" }} />
        </div>
        <div>swiper</div>
        <div
          style={{
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
          <img src={checkboxIcon} alt="" />
          다시 보지 않기
        </div>
      </div>
    </div>
  );
};

const SendPraise = () => {
  const [praiseInfo, setPraiseInfo] = useState<PraiseProps>({
    content: "내 인생의 절반을 줄테니 네 인생의 절반을 줘..",
    members: [
      { name: "박세원", profileImage: ex, isChannelAdmin: false, userId: 1 },
      { name: "송현섭", profileImage: ex, isChannelAdmin: false, userId: 2 },
      { name: "김민근", profileImage: ex, isChannelAdmin: false, userId: 3 },
      { name: "유승민", profileImage: ex, isChannelAdmin: false, userId: 4 },
      { name: "윤석민", profileImage: ex, isChannelAdmin: true, userId: 5 },
      { name: "변지현", profileImage: ex, isChannelAdmin: false, userId: 6 },
      { name: "송예지", profileImage: ex, isChannelAdmin: false, userId: 7 },
      { name: "이은경", profileImage: ex, isChannelAdmin: false, userId: 8 },
    ],
    hasShuffled: false,
  });
  const start = praiseInfo.hasShuffled ? 4 : 0;
  const end = praiseInfo.hasShuffled ? 8 : 4;
  const [selectedMember, setSelectedMember] = useState<number>(-1);
  const [showPraiseModal, setShowPraiseModal] = useState(false);
  const [showPraiseNotTimer, setShowPraiseNotTimer] = useState(true);
  const [showFirstModal, setShowFirstModal] = useState(true);
  const [firstModalNeverShow, setFirstModalNeverShow] = useState(false);

  const firstModalCloseOnClick = () => {
    if (firstModalNeverShow) {
      // 다시보지않기 api 전송
    }
    setShowFirstModal(false);
  };

  const handleShuffleClick = () => {
    setPraiseInfo((prev) => ({
      ...prev,
      hasShuffled: !prev.hasShuffled, // 개발 후 false로 변경하고 shuffle Click 막아야 함
    }));
    setSelectedMember(-1);
  };

  const handleSendPraise = async () => {
    console.log(selectedMember);
    setSelectedMember(-1);
    /* await 칭찬 api 함수 */
    setShowPraiseModal(true);
  };

  const modalCloseAndShowTimer = () => {
    setShowPraiseModal(false);
    setShowPraiseNotTimer(false);
  };

  return (
    <>
      {showPraiseNotTimer ? (
        <SendPraiseContainer>
          <SendPraiseTitle>{praiseInfo.content}</SendPraiseTitle>
          <ShuffleButton
            onClick={handleShuffleClick}
            style={{
              color: praiseInfo.hasShuffled ? `${color.onPrimaryDisabled}` : "",
              borderColor: praiseInfo.hasShuffled
                ? `${color.onPrimaryDisabled}`
                : "",
            }}
          >
            <ShuffleIcon
              style={{
                width: "21px",
                height: "21px",
                fill: praiseInfo.hasShuffled
                  ? `${color.onPrimaryDisabled}`
                  : `${color.onPrimaryActive}`,
              }}
            />
            이름 셔플 {praiseInfo.hasShuffled ? "1" : "0"}/1
          </ShuffleButton>
          <PraiseMemberContainer>
            {praiseInfo.members.slice(start, end).map((member, index) => (
              <PraiseMemberWrapper
                key={index}
                name={member.name}
                profileImage={member.profileImage}
                isChannelAdmin={member.isChannelAdmin}
                userId={member.userId}
                selectedMember={selectedMember}
                onClick={() => setSelectedMember(member.userId)}
              />
            ))}
          </PraiseMemberContainer>
          <PraiseConfirmButton
            disabled={selectedMember === -1}
            onClick={handleSendPraise}
            style={{ cursor: selectedMember !== -1 ? "pointer" : "" }}
          >
            확인
          </PraiseConfirmButton>
          {showPraiseModal && <PraiseModal onClick={modalCloseAndShowTimer} />}
        </SendPraiseContainer>
      ) : (
        <TimerContainer>
          <WaveWhaleDiv>
            <img
              width="65px"
              style={{ position: "absolute", left: "53px", bottom: "3px" }}
              src={whaleCharacter4}
              css={leftWhaleWaveStyle}
              alt=""
            />
            <img
              width="63px"
              style={{ position: "absolute", left: "148px", bottom: "8.5px" }}
              src={whaleCharacter5}
              css={rightWhaleWaveStyle}
              alt=""
            />
            <img css={waveSvgStyles} src={wave} alt="" />
          </WaveWhaleDiv>
          <TimerTitle>
            다음 칭찬 질문까지 <b>남은 시간</b>은
          </TimerTitle>
          <Timer />
          <span css={helpMessageStyle}>받고 싶은 칭찬이 있다면?</span>
          <a
            href="https://forms.gle/dckdnpm441eVWvjp7"
            target="_blank"
            rel="noreferrer"
            css={aTagStyle}
          >
            <PraiseAddButton>
              칭찬 등록
              <img src={rightArrowIcon} alt="" />
            </PraiseAddButton>
          </a>
        </TimerContainer>
      )}
      {showFirstModal && (
        <FirstModal
          firstModalNeverShow={firstModalNeverShow}
          setFirstModalNeverShow={setFirstModalNeverShow}
          firstModalCloseOnClick={firstModalCloseOnClick}
        />
      )}
    </>
  );
};
export default SendPraise;

const SendPraiseContainer = styled.div`
  height: 535px;
  margin: 20px 20px 94px 20px;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 30px;
  background: linear-gradient(135deg, #2a99ff 0%, #abd7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SendPraiseTitle = styled.h1`
  font-size: 21px;
  font-weight: 600;
  line-height: 1.5;
  color: ${color.onPrimaryActive};
  height: 95px;
`;

const ShuffleButton = styled.button`
  margin-top: 36px;
  margin-bottom: 16px;
  font-family: Pretendard;
  background: transparent;
  width: 140px;
  height: 32px;
  box-sizing: border-box;
  border-radius: 100px;
  border: 1px solid ${color.onPrimaryActive};
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  color: ${color.onPrimaryActive};
  cursor: pointer;
`;

const PraiseMemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;
`;

const PraiseConfirmButton = styled.button`
  width: 275px;
  height: 44px;
  border-radius: 100px;
  border: none;
  background-color: ${color.primary500};
  color: ${color.onPrimaryActive};
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const WaveWhaleDiv = styled.div`
  position: relative;
  height: 74px;
  width: 262px;
  margin: 120px 0 40px 0;
  overflow: hidden;
`;
const moveWave = keyframes`
  0% {
    transform: translateX(0);
  }
  50%{
    transform: translateX(85px);
  }
  100% {
    transform: translateX(0px);
  }
`;
const leftWhaleWave = keyframes`
  0% {
    transform: translateY(0);
  }
  50%{
    transform: translateY(-5px);
  }
  100%{
    transform: translateY(0);
  }
`;
const leftWhaleWaveStyle = css`
  animation: ${leftWhaleWave} 3s linear infinite;
`;
const rightWhaleWave = keyframes`
  0% {
    transform: translateY(0);
  }
  25%{
    transform: translateY(2px);
  }
  50%{
    transform: translateY(0);
  }
  75%{
    transform: translateY(-2px);
  }
  100%{
    transform: translateY(0);
  }
`;
const rightWhaleWaveStyle = css`
  animation: ${rightWhaleWave} 3s linear infinite;
`;

const waveSvgStyles = css`
  position: absolute;
  bottom: 0;
  left: -85px;
  animation: ${moveWave} 10s linear infinite;
`;

const TimerTitle = styled.h1`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: ${color.onSurfaceActive};
  margin-bottom: 20px;
`;

const helpMessageStyle = css`
  margin-top: 100px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: ${color.onSurfaceMuted};
`;

const PraiseAddButton = styled.button`
  width: 335px;
  height: 47px;
  padding: 0;
  display: flex;
  gap: 8px;
  border: none;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${color.surface};
  font-family: Pretendard;
  color: ${color.onSurfaceDefault};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 77px;
`;
const aTagStyle = css`
  text-decoration: none;
`;