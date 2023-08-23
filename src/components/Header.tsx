import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backButton from "../images/back.svg";
import outButton from "../images/out.svg";
import profileImg from "../images/profile.png";
import { ReactComponent as NoticeImg } from "../images/notice.svg";
import { ReactComponent as FrameImg } from "../images/frame.svg";
import Sidebar from "./Sidebar";

// 타입: 뒤로가기, 기본(동아리명, 알림), 모임 만들기, 모임 상세
//       알림, 참여한 멤버, 댓글, 모임 수정, 카드 만들기
// 나중에 필요한 요소 추가 예정(이미지, 댓글수, 상태 등등)
interface Props {
  type: "back" | "common" | "out";
  text?: string;
  isChannelAdmin?: boolean;
}

const Header = ({ type, text, isChannelAdmin }: Props) => {
  const navigate = useNavigate();
  const [sidebarState, setSidebarState] = useState<number>(0);
  if (
    (type === "common" && isChannelAdmin === undefined) ||
    (type !== "common" && isChannelAdmin !== undefined)
  ) {
    console.error("type이 common일 때만 isChannelAdmin 값이 있어야 합니다.");
    return null;
  }

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleChannelButtonClick = () => {
    setSidebarState(1);
    document.body.style.overflow = "hidden";
  };

  const handleOutsideClick = () => {
    setSidebarState(0);
    document.body.style.overflow = "unset";
  };

  if (type === "back" || type === "out") {
    return (
      <div
        style={{
          height: "44px",
          margin: "0 16px 0 16px",
          zIndex: "1",
          position: "sticky",
          top: "0px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div onClick={handleBackButtonClick} style={{ cursor: "pointer" }}>
          <img
            width="24px"
            height="24px"
            src={type === "back" ? backButton : outButton}
            alt={type === "back" ? "back" : "out"}
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "16px",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            color: "var(--on-surface-active, #0A0A0A)",
          }}
        >
          <span>{text}</span>
        </div>
        <div style={{ height: "24px", width: "24px" }}></div>
      </div>
    );
  } else if (type === "common") {
    return (
      <>
        <div
          style={{
            height: "44px",
            padding: "0 20px 0 16px",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            zIndex: "1",
            position: "sticky",
            top: "0px",
            backgroundColor: "white",
          }}
        >
          <div
            onClick={handleChannelButtonClick}
            style={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "150%",
              cursor: "pointer",
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              width="24px"
              height="24px"
              src={profileImg}
              alt="channelprofile"
            ></img>
            <span style={{ marginLeft: "10px" }}>멋쟁이사자처럼 10기</span>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            {isChannelAdmin === true ? (
              <>
                <NoticeImg style={{ cursor: "pointer" }} />
                <FrameImg style={{ cursor: "pointer" }} />
              </>
            ) : (
              <NoticeImg style={{ cursor: "pointer" }} />
            )}
          </div>
        </div>
        {sidebarState === 1 && (
          <>
            <div
              onClick={handleOutsideClick}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.50)",
                zIndex: "2",
              }}
            ></div>
            <Sidebar></Sidebar>
          </>
        )}
      </>
    );
  } else {
    return <div style={{ height: "44px" }}></div>;
  }
};

export default Header;
