import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import CircularImage from "../components/CircularImage";
import { ReactComponent as ClockImg } from "../images/clock.svg";
import { ReactComponent as LocationImg } from "../images/location.svg";
import { ReactComponent as ArrowImg } from "../images/arrow.svg";
import { ReactComponent as PeopleImg } from "../images/people.svg";
import { ReactComponent as CommentImg } from "../images/comment.svg";
import BtnProfileThumbnail from "../components/BtnProfileThumbnail";
import ButtonBasic from "../components/ButtonBasic";
import { color } from "../styles/color";
import ButtonMultiple from "../components/ButtonMultiple";
import PopupComplaint from "../components/PopupComplaint";
import Popup2 from "../components/Popup2";
import Popup1 from "../components/Popup1";
import { axiosInstance } from "../apis/axiosInstance";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

const MeetupDetail = () => {
  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  dayjs.locale("ko");
  const { channelCode, meetupId } = useParams();
  const CHANNEL_ID = localStorage.getItem("channelId");
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const CONFIG = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  };

  const [isMeetupMaker, setIsMeetupMaker] = useState<boolean>(false);
  const [kebabState, setKebabState] = useState<boolean>(false);
  const [showComplaint, setShowComplaint] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showMeetupPopup, setShowMeetupPopup] = useState<boolean>(false);
  const [showMeetupCancelPopup, setShowMeetupCancelPopup] =
    useState<boolean>(false);
  const [showMeetupCompletePopup, setShowMeetupCompletePopup] =
    useState<boolean>(false);

  // 1 - 모임 참여하기 / 2- 모임 참여 취소하기 / 3 - 모임 진행 중 / 4 - 모임 완료 / 5 - 모집 완료 / 6 - 카드 만들기
  const [buttonState, setButtonState] = useState<number>(4);

  const handleKebabClick = () => {
    if (buttonState === 4) {
      setIsMeetupMaker(false);
    }
    setKebabState(true);
  };

  const handleMemberButtonClick = () => {
    navigate(`/${channelCode}/meetup-member/${meetupId}`);
  };

  const handleMeetupDeleteBtnClick = async () => {
    await axiosInstance
      .delete(`/party/cancel?channelId=${CHANNEL_ID}&partyId=${meetupId}`)
      .then((res) => {
        setShowDeletePopup(false);
        navigate(-1);
      })
      .catch((err) => console.error(err));
  };

  const handleMeetupParticipateBtnClick = async () => {
    await axiosInstance
      .post(`/party/apply`, {
        channelId: CHANNEL_ID,
        partyId: meetupId,
      })
      .then((res) => {
        setButtonState(2);
        setShowMeetupPopup(false);
      })
      .catch((err) => console.error(err));
  };

  const handleMeetupCancelBtnClick = async () => {
    await axiosInstance
      .delete(`/party/apply/cancel?channelId=${CHANNEL_ID}&partyId=${meetupId}`)
      .then((res) => {
        setButtonState(1);
        setShowMeetupCancelPopup(false);
      })
      .catch((err) => console.error(err));
  };

  const handleMeetupCompleteBtnClick = async () => {
    await axiosInstance
      .patch(`/party/close`, {
        channelId: CHANNEL_ID,
        partyId: meetupId,
      })
      .then((res) => {
        setButtonState(6);
        setShowMeetupCompletePopup(false);
      })
      .catch((err) => console.error(err));
  };

  const handleButtonClick = () => {
    if (buttonState === 1) {
      setShowMeetupPopup(true);
    } else if (buttonState === 2) {
      setShowMeetupCancelPopup(true);
    } else if (buttonState === 5) {
      setShowMeetupCompletePopup(true);
    } else if (buttonState === 6) {
      navigate(`/${channelCode}/create-card/${meetupId}`);
    }
  };

  const buttonData = [
    "",
    "모임 참여하기",
    "모임 참여 취소하기",
    "모임 진행 중",
    "모임 완료",
    "모집 완료",
    "카드 만들기",
  ];

  const [sharePopup, setSharePopup] = useState(false);

  const handleShareButtonClick = () => {
    if (navigator.share !== undefined) {
      navigator
        .share({
          title: `모임명: ${meetupTitle}\n`,
          text: "링크를 타고 들어와 공유된 모임을 확인해보세요\n",
          url: `${window.location.origin}/${channelCode}/meetup-home/?meetupId=${meetupId}`,
        })
        .catch((error) => {
          if (!error.toString().includes("Share canceled")) {
            setSharePopup(true);
          }
        });
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(
          `${window.location.origin}/${channelCode}/meetup-home/?meetupId=${meetupId}`
        )
        .then(() => {
          alert("공유가 불가하여 클립보드에 링크가 복사되었습니다");
        })
        .catch((error) => setSharePopup(true));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = `${window.location.origin}/${channelCode}/meetup-home/?meetupId=${meetupId}`;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      try {
        document.execCommand("copy");
      } catch (err) {
        setSharePopup(true);
      }
      textArea.setSelectionRange(0, 0);
      document.body.removeChild(textArea);
      alert("공유가 불가하여 클립보드에 링크가 복사되었습니다");
    }
  };

  const [meetupTitle, setMeetupTitle] = useState<string>("");
  const [meetupContent, setMeetupContent] = useState<string>("");
  const [meetupAdminId, setMeetupAdminId] = useState<number>();
  const [meetupAdminName, setMeetupAdminName] = useState<string>("");
  const [meetupAdminImg, setMeetupAdminImg] = useState<string>("");
  const [meetupPostedBefore, setMeetupPostedBefore] = useState<string>("");
  const [meetupImg, setMeetupImg] = useState<string>("");
  const [meetupDate, setMeetupDate] = useState<string>("");
  const [meetupLocation, setMeetupLocation] = useState<string>("");
  const [meetupMaxNum, setMeetupMaxNum] = useState<number>();
  const [meetupCurrentNum, setMeetupCurrentNum] = useState<number>();
  const [meetupJoinMember, setMeetupJoinMember] = useState<Array<any>>([]);
  const [commentNum, setCommentNum] = useState<number>();
  const [comment, setComment] = useState<string>("");
  const [commentWriterName, setCommentWriterName] = useState<string>("");
  const [commentWriterProfileImg, setCommentWriterProfileImg] =
    useState<string>("");

  useEffect(() => {
    axiosInstance
      .get(
        `/party/detail/${meetupId}?channelId=${localStorage.getItem(
          "channelId"
        )}`
      )
      .then((res) => {
        const meetupData = res.data.data;
        setMeetupTitle(meetupData.title);
        setMeetupContent(meetupData.content);
        setMeetupAdminId(meetupData.openMemberId);
        setMeetupAdminName(meetupData.openMemberName);
        setMeetupAdminImg(meetupData.openMemberProfileImageUrl);
        setMeetupImg(
          meetupData.partyImageUrl === "" ? undefined : meetupData.partyImageUrl
        );
        setMeetupLocation(meetupData.location);
        setMeetupMaxNum(meetupData.maxCapacity);
        setMeetupCurrentNum(meetupData.joinMemberInfo.length);
        setMeetupJoinMember(meetupData.joinMemberInfo);
        setCommentNum(meetupData.roughCommentInfo.partyCommentCount);
        setComment(meetupData.roughCommentInfo.commentContent);
        setCommentWriterName(meetupData.roughCommentInfo.commentWriterName);
        setCommentWriterProfileImg(
          meetupData.roughCommentInfo.commentWriterProfileImageUrl
        );
        setMeetupDate(meetupData.partyDate);
        const now = dayjs();
        const duration = now.diff(meetupData.createdAt, "minute");
        if (duration > 1440) {
          setMeetupPostedBefore(`${Math.floor(duration / 1440)}일전`);
        } else if (duration > 60) {
          setMeetupPostedBefore(`${Math.floor(duration / 60)}시간전`);
        } else if (duration > 0) {
          setMeetupPostedBefore(`${duration}분전`);
        } else {
          setMeetupPostedBefore(`1분전`);
        }
        if (meetupData.buttonState === "JOIN") {
          setButtonState(1);
        } else if (meetupData.buttonState === "JOIN_CANCEL") {
          setButtonState(2);
        } else if (meetupData.buttonState === "IN_PROGRESS") {
          setButtonState(3);
        } else if (meetupData.buttonState === "END") {
          setButtonState(4);
        } else if (meetupData.buttonState === "CLOSE") {
          setButtonState(5);
        } else if (meetupData.buttonState === "MAKE_CARD") {
          setButtonState(6);
        } else {
          console.error("잘못된 버튼 상태가 들어왔습니다.");
        }
        if (`${meetupData.openMemberId}` === localStorage.getItem("memberId")) {
          setIsMeetupMaker(true);
        }
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonState]);

  const handleAdminImgClick = () => {
    if (`${meetupAdminId}` === localStorage.getItem("memberId")) {
      navigate(`/${channelCode}/mypage`);
    } else {
      navigate(`/${channelCode}/memberpage/${meetupAdminId}`);
    }
  };

  return (
    <>
      <Header
        type='detail'
        func={handleKebabClick}
        shareFunc={handleShareButtonClick}
      ></Header>
      <div style={{ height: "12px" }}></div>
      <div
        style={{
          margin: "0 20px 0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--on-surface-default, rgba(10, 10, 10, 0.70))",
        }}
      >
        <div
          onClick={handleAdminImgClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          <CircularImage image={meetupAdminImg} size='24' />
          <div
            style={{ fontSize: "14px", fontStyle: "normal", fontWeight: "500" }}
          >
            {meetupAdminName}
          </div>
        </div>
        <div
          style={{ fontSize: "12px", fontStyle: "normal", fontWeight: "400" }}
        >
          {meetupPostedBefore}
        </div>
      </div>
      <div style={{ height: "22px" }}></div>
      <div
        style={{
          margin: "0 20px 0 20px",
          height: "32px",
          display: "block",
          alignItems: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color:
            "var(--text-text-active, var(--light-text-text-active, #0D0D0D))",
          fontSize: "21px",
          fontStyle: "normal",
          lineHeight: "150%",
          fontWeight: "600",
          wordBreak: "break-all",
        }}
      >
        {meetupTitle}
      </div>
      <div style={{ height: "12px" }}></div>
      <div
        style={{
          margin: "0 20px 0 20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            color: "#0A0A0A",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "150%",
            flexBasis: "24px",
            width: "100%",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {meetupContent}
        </p>
      </div>
      {meetupImg !== undefined && (
        <>
          <div style={{ height: "28px" }}></div>
          <div style={{ margin: "0 20px 0 20px" }}>
            <div
              style={{
                width: "100%",
                paddingBottom: "100%",
                backgroundImage: `url(${meetupImg})`,
                borderRadius: "8px",
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
              }}
            ></div>
          </div>
        </>
      )}
      <div style={{ height: "28px" }}></div>
      <div
        style={{
          background: "var(--surface-surface, #FAFAFA)",
          height: "8px",
          width: "100%",
        }}
      ></div>
      <div style={{ height: "28px" }}></div>
      <div
        style={{
          height: "20px",
          fontSize: "18px",
          fontStyle: "normal",
          fontWeight: "500",
          marginLeft: "20px",
        }}
      >
        모임 정보
      </div>
      <div style={{ height: "12px" }}></div>
      <div
        style={{
          margin: "0 20px",
          width: "calc(100% - 72px)",
          maxWidth: "calc(100% - 72px)",
          height: "48px",
          background: "var(--surface-surface, #FAFAFA)",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          padding: "12px 16px",
          alignItems: "flex-start",
          gap: "12px",
          color: "var(--on-surface-default, rgba(10, 10, 10, 0.70))",
        }}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <ClockImg width={18} height={18} fillOpacity={0.7} />
            <div
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "600",
              }}
            >
              일시
            </div>
          </div>
          <div
            style={{ fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}
          >
            {meetupDate}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <LocationImg width={18} height={18} fillOpacity={0.7} />
            <div
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "600",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                wordBreak: "break-all",
                flexShrink: "0",
              }}
            >
              장소
            </div>
          </div>
          <div
            style={{
              width: "calc(100%)",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "400",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
            }}
          >
            {meetupLocation}
          </div>
        </div>
      </div>
      <div style={{ height: "26px" }}></div>
      <div
        style={{
          height: "24px",
          display: "flex",
          margin: "0 20px 0 20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            height: "20px",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "500",
          }}
        >
          멤버
        </div>
        <ArrowImg
          onClick={handleMemberButtonClick}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div style={{ height: "10px" }}></div>
      <div
        style={{
          margin: "0 20px 0 20px",
          padding: "12px 16px",
          height: "94px",
          borderRadius: "8px",
          background: "var(--surface-surface, #FAFAFA)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            color: "var(--on-surface-default, rgba(10, 10, 10, 0.70))",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <PeopleImg width={18} height={18} fillOpacity={0.7} />
            <div
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "600",
              }}
            >
              인원
            </div>
          </div>
          <div
            style={{ fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}
          >
            {meetupCurrentNum}/{meetupMaxNum}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            width: "100%",
            overflow: "hidden",
            flexWrap: "wrap",
          }}
        >
          {meetupJoinMember.map((item, index) => {
            return (
              <BtnProfileThumbnail
                key={index}
                userImg={item.memberProfileImageUrl}
                userName={item.memberName}
                userId={item.memberId}
              />
            );
          })}
        </div>
      </div>
      <div style={{ height: "26px" }}></div>
      <div
        style={{
          height: "24px",
          display: "flex",
          margin: "0 20px 0 20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            height: "20px",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "500",
          }}
        >
          댓글
        </div>
        <ArrowImg
          onClick={() => navigate(`/${channelCode}/comment/${meetupId}`)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div style={{ height: "10px" }}></div>
      <div
        onClick={() => navigate(`/${channelCode}/comment/${meetupId}`)}
        style={{
          margin: "0 20px 0 20px",
          padding: "12px 16px",
          height: "62px",
          borderRadius: "8px",
          background: "var(--surface-surface, #FAFAFA)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "6px",
            color: "var(--on-surface-default, rgba(10, 10, 10, 0.70))",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <CommentImg />
            <div
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "600",
              }}
            >
              댓글 수
            </div>
          </div>
          <div
            style={{ fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}
          >
            {commentNum}
          </div>
        </div>
        {commentNum === 0 ? (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                color: "var(--on-surface-muted, rgba(10, 10, 10, 0.45))",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                textAlign: "center",
                lineHeight: "150%",
              }}
            >
              아직 댓글이 달리지 않았어요
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontStyle: "normal",
                lineHeight: "150%",
                width: "100%",
                color: "var(--on-surface-default, rgba(10, 10, 10, 0.70))",
              }}
            >
              <CircularImage size='24' image={commentWriterProfileImg} />
              <div
                style={{
                  fontWeight: "500",
                  maxWidth: "60px",
                  display: "block",
                  alignItems: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  wordBreak: "break-all",
                }}
              >
                {commentWriterName}
              </div>
              <div
                style={{
                  fontWeight: "400",
                  minWidth: "0",
                  flex: "1",
                  display: "block",
                  alignItems: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  wordBreak: "break-all",
                }}
              >
                {comment}
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ height: "103px" }}></div>
      <div
        style={{
          margin: "0",
          bottom: "0",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxWidth: "500px",
          height: "47px",
          padding: "8px 0",
          boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.10)",
          background: `${color.background}`,
        }}
      >
        <div style={{ width: "calc(100% - 40px)", maxWidth: "460px" }}>
          <ButtonBasic
            innerText={buttonData[buttonState]}
            onClick={handleButtonClick}
            disable={
              buttonState === 3 ||
              buttonState === 4 ||
              (meetupMaxNum === meetupCurrentNum && buttonState === 1)
                ? true
                : buttonState === 1 || buttonState === 5
                ? false
                : undefined
            }
            btnColor={
              buttonState === 2 || buttonState === 6 ? "#FDB639" : undefined
            }
            textDisable={
              buttonState === 3 ||
              buttonState === 4 ||
              (meetupMaxNum === meetupCurrentNum && buttonState === 1)
                ? true
                : false
            }
          />
        </div>
      </div>

      {/* kebab */}
      {kebabState &&
        (isMeetupMaker ? (
          <>
            <ButtonMultiple
              closeHandler={() => setKebabState(false)}
              textList={["모임 내용 수정", "모임 삭제", "취소"]}
              onClickList={[
                () => {
                  setKebabState(false);
                  navigate(`/${channelCode}/edit-meetup/${meetupId}`);
                },
                () => {
                  setKebabState(false);
                  setShowDeletePopup(true);
                },
                () => setKebabState(false),
              ]}
            />
          </>
        ) : (
          <>
            <ButtonMultiple
              closeHandler={() => setKebabState(false)}
              textList={["게시물 신고", "취소"]}
              onClickList={[
                () => {
                  setKebabState(false);
                  setShowComplaint(true);
                },
                () => setKebabState(false),
              ]}
            />
          </>
        ))}

      {/* 모달 창 */}
      {showComplaint && <PopupComplaint func={() => setShowComplaint(false)} />}
      {showDeletePopup && (
        <Popup2
          title='모임을 삭제하시나요?'
          text={"모임을 삭제한 이후에는\n다시 복구할 수 없어요"}
          leftBtnText='취소'
          rightBtnText='확인'
          leftFunc={() => setShowDeletePopup(false)}
          rightFunc={() => handleMeetupDeleteBtnClick()}
        />
      )}
      {showMeetupPopup && (
        <Popup1
          title='알림'
          text={
            "모임 신청이 완료되었어요!\n방장이 모집 완료를 하기 전까지\n잠시만 기다려주세요"
          }
          btnText='확인'
          func={() => handleMeetupParticipateBtnClick()}
        />
      )}
      {showMeetupCancelPopup && (
        <Popup2
          title='모임 참여를 취소하시나요?'
          text={"참여를 취소해도 모임이 모집 중이라면\n다시 참여 할 수 있어요"}
          leftBtnText='취소'
          rightBtnText='확인'
          leftFunc={() => setShowMeetupCancelPopup(false)}
          rightFunc={() => handleMeetupCancelBtnClick()}
        />
      )}
      {showMeetupCompletePopup && (
        <Popup2
          title='모임 모집을 완료하시나요?'
          text={"모집을 완료한 이후에는\n추가로 멤버를 모집할 수 없어요"}
          leftBtnText='취소'
          rightBtnText='확인'
          leftFunc={() => setShowMeetupCompletePopup(false)}
          rightFunc={() => handleMeetupCompleteBtnClick()}
        />
      )}
      {sharePopup && (
        <Popup1
          title='공유하기 실패'
          text={`오류로 인해 공유하기에 실패했습니다\n아래의 링크를 복사해주세요\n${window.location.origin}/${channelCode}/meetup-home/?meetupId=${meetupId}`}
          btnText='닫기'
          func={() => setSharePopup(false)}
        />
      )}
    </>
  );
};

export default MeetupDetail;
