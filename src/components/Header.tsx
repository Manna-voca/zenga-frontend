import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backButton from "../images/back.svg";
import outButton from "../images/out.svg";
import { ReactComponent as NoticeImg } from "../images/notice.svg";
import { ReactComponent as FrameImg } from "../images/frame.svg";
import { ReactComponent as ShareImg } from "../images/share.svg";
import { ReactComponent as KebabImg } from "../images/kebab.svg";
import { ReactComponent as DownloadImg } from "../images/download.svg";
import { ReactComponent as ParticipantImg } from "../images/participant.svg";
import { ReactComponent as PointsImg } from "../images/points.svg";
import { ReactComponent as RankPointIcon } from "../images/rankPointIcon.svg";
import Sidebar from "./Sidebar";
import CircularImage from "./CircularImage";
import { color } from "../styles/color";
import { axiosInstance } from "../apis/axiosInstance";
import { typography } from "../styles/typography";
import { fetchMyRankInfo } from "../apis/ranking";
import { fetchZengaPoint } from "../apis/zengaPoint";
import { 점수최대치처리 } from "../utils/addCommas";

// 타입: 뒤로가기, 기본(동아리명, 알림), 모임 만들기, 모임 상세
//       알림, 참여한 멤버, 댓글, 모임 수정, 카드 만들기
// 나중에 필요한 요소 추가 예정(이미지, 댓글수, 상태 등등)
interface Props {
  type: "back" | "common" | "out" | "detail" | "card" | "my";
  text?: string;
  download?: false;
  downloadFunc?: any;
  func?: any;
  shareFunc?: any;
}

interface ChannelInfoProps {
  isOwner: boolean;
  logoImageUrl: string;
  code: string;
  id: number;
  name: string;
}

const Header = ({
  type,
  text,
  download,
  downloadFunc,
  func,
  shareFunc,
}: Props) => {
  const navigate = useNavigate();
  const { channelCode } = useParams();
  const MEMBER_ID = localStorage.getItem("memberId");

  const [sidebarState, setSidebarState] = useState<number>(0);
  const [channelInfo, setChannelInfo] = useState<ChannelInfoProps | null>(null);
  const [noticeInfo, setNoticeInfo] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [rankPoint, setRankPoint] = useState<string>("");
  const [zengaPoint, setZengaPoint] = useState<string>("");

  useEffect(() => {
    if (type === "common") {
      getChannelInfo();
    }
    if (type === "my") {
      const myRankPoint = fetchMyRankInfo();
      const myZengaPoint = fetchZengaPoint();

      myRankPoint.then((res) => {
        setRankPoint(점수최대치처리(res.point));
      });
      myZengaPoint.then((res) => {
        setZengaPoint(점수최대치처리(res));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    (type === "card" && func === undefined) ||
    (type === "detail" && func === undefined)
  ) {
    console.error("type이 detail 혹은 card일 때 onClick 값이 있어야 합니다.");
    return null;
  }

  const handleBackButtonClick = () => {
    document.body.style.overflow = "unset";
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

  const handleParticipantImgClick = () => {
    func();
  };

  const handleKebabClick = () => {
    func();
  };

  const getChannelInfo = async () => {
    try {
      setIsLoading(true);
      await axiosInstance
        .get(`/channels/info?code=${channelCode}`)
        .then((res) => {
          const CHANNEL_ID = res.data.data.id;
          axiosInstance.get(`/channels/${CHANNEL_ID}`).then((res) => {
            setChannelInfo(res.data.data);
            setIsLoading(false);
          });
        });
      axiosInstance
        .get(`/notification/member/${MEMBER_ID}/has-unchecked`)
        .then((res) => {
          setNoticeInfo(res.data.data.hasUncheckedNotification);
        });
    } catch (err) {
      console.error(err);
    }
  };

  if (type === "back" || type === "out") {
    return (
      <div
        style={{
          height: "44px",
          padding: "0 16px 0 16px",
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
            width='24px'
            height='24px'
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
              maxWidth: "360px",
              width: "calc(100vw - 140px)",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "lightgray",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <>
                <CircularImage
                  size='24'
                  image={channelInfo !== null ? channelInfo.logoImageUrl : ""}
                />
                <span
                  style={{
                    marginLeft: "10px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {channelInfo !== null ? channelInfo.name : ""}
                </span>
              </>
            )}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            {channelInfo !== null && channelInfo.isOwner ? (
              <>
                <div
                  onClick={() => navigate(`/${channelCode}/notification`)}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <NoticeImg />
                  <div
                    style={{
                      display: noticeInfo ? "block" : "none",
                      position: "absolute",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: `${color.primary500}`,
                      top: "1px",
                      right: "2px",
                    }}
                  />
                </div>
                <FrameImg
                  onClick={() =>
                    navigate(`/${channelCode}/modify-channel-info`)
                  }
                  style={{ cursor: "pointer" }}
                />
              </>
            ) : (
              <div
                onClick={() => navigate(`/${channelCode}/notification`)}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <NoticeImg />
                <div
                  style={{
                    display: noticeInfo ? "block" : "none",
                    position: "absolute",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: `${color.primary500}`,
                    top: "1px",
                    right: "2px",
                  }}
                />
              </div>
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
  } else if (type === "detail") {
    return (
      <>
        <div
          style={{
            height: "44px",
            padding: "0 16px 0 16px",
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
            <img width='24px' height='24px' src={backButton} alt='back'></img>
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}
          >
            <ShareImg
              onClick={() => shareFunc()}
              style={{ cursor: "pointer" }}
            />
            <KebabImg
              onClick={handleKebabClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </>
    );
  } else if (type === "card") {
    return (
      <>
        <div
          style={{
            height: "44px",
            padding: "0 16px 0 16px",
            zIndex: "1",
            position: "sticky",
            top: "0px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={handleBackButtonClick}
            style={{ display: "flex", gap: "20px" }}
          >
            <img
              style={{ cursor: "pointer" }}
              width='24px'
              height='24px'
              src={backButton}
              alt={"back"}
            ></img>
            <div style={{ width: "24px", height: "24px" }}></div>
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
          <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
            {download !== false && (
              <DownloadImg
                onClick={() => downloadFunc()}
                style={{ cursor: "pointer" }}
              />
            )}
            <ParticipantImg
              onClick={handleParticipantImgClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </>
    );
  } else if (type === "my") {
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
            style={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "150%",
              color: "var(--on-surface-active, #0A0A0A)",
            }}
          >
            마이페이지
          </div>
          <div
            onClick={() => navigate("/point")}
            style={{
              ...typography.caption1Medium,
              color: `${color.onSurfaceActive}`,
              display: "flex",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <PointsImg height={18} width={18} />
              {zengaPoint}
            </div>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <RankPointIcon height={18} width={18} />
              {rankPoint}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div style={{ height: "44px" }}></div>;
  }
};

export default Header;
