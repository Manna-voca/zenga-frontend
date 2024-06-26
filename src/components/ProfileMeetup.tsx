/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import { color } from "../styles/color";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowImg } from "../images/arrow.svg";
import MeetupList from "./MeetupList";
import { axiosInstance } from "../apis/axiosInstance";

const ProfileMeetup = () => {
  const navigate = useNavigate();
  const { channelCode } = useParams();
  const MEMBER_ID = localStorage.getItem("memberId");
  const [loading, setLoading] = useState<boolean>(false);
  const [recruitingList, setRecruitingList] = useState<Array<any>>([]);
  const [inProgressList, setInProgressList] = useState<Array<any>>([]);
  const [completedList, setCompletedList] = useState<Array<any>>([]);

  const handleArrowBtnClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const meetupState: string = event.currentTarget.id;
    navigate(`/${channelCode}/my-meetup/?state=${meetupState}`);
  };

  const getMeetupInfo = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await axiosInstance
        .get(`/members/${MEMBER_ID}/parties/all`)
        .then((res) => {
          let rList = [];
          let iList = [];
          let cList = [];
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].state === "RECRUITING") {
              rList.push(res.data.data[i]);
            } else if (res.data.data[i].state === "IN_PROGRESS") {
              iList.push(res.data.data[i]);
            } else {
              cList.push(res.data.data[i]);
            }
          }
          setRecruitingList(rList);
          setInProgressList(iList);
          setCompletedList(cList);
        });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMeetupInfo();
  }, []);

  return (
    <>
      <div style={{ height: "18px" }}></div>
      <div style={{ margin: "0 20px 0 20px" }}>
        <div
          style={{
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "var(--on-surface-active, #0A0A0A)",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "150%",
          }}
        >
          <div>모집중</div>
          <ArrowImg
            id="1"
            onClick={handleArrowBtnClick}
            style={{ cursor: "pointer" }}
          />
        </div>

        {recruitingList.length === 0 ? (
          <>
            <div style={{ height: "48px" }}></div>
            <div
              style={{
                height: "46px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--on-surface-muted, rgba(10, 10, 10, 0.45))",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {loading ? <LoadingSpinner /> : "참여 중인\n모임이 없어요"}
            </div>
            <div style={{ height: "94px" }}></div>
          </>
        ) : (
          <>
            <div style={{ height: "14px" }}></div>
            <div
              style={{
                height: "152px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {recruitingList.map((item, index) => {
                return (
                  <MeetupList
                    key={item.partyId}
                    meetupId={item.partyId}
                    title={item.title}
                    image={
                      item.partyImageUrl === "" ? undefined : item.partyImageUrl
                    }
                    date={item.partyDate}
                    location={item.location}
                    userImg={item.openMemberProfileImageUrl}
                    userName={item.openMemberName}
                    currentNum={item.joinMemberCount}
                    maxNum={item.maxCapacity}
                  ></MeetupList>
                );
              })}
            </div>
            <div style={{ height: "22px" }}></div>
          </>
        )}

        <div
          style={{
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "var(--on-surface-active, #0A0A0A)",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "150%",
          }}
        >
          <div>진행중</div>
          <ArrowImg
            id="2"
            onClick={handleArrowBtnClick}
            style={{ cursor: "pointer" }}
          />
        </div>

        {inProgressList.length === 0 ? (
          <>
            <div style={{ height: "48px" }}></div>
            <div
              style={{
                height: "46px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--on-surface-muted, rgba(10, 10, 10, 0.45))",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {loading ? <LoadingSpinner /> : "참여 중인\n모임이 없어요"}
            </div>
            <div style={{ height: "94px" }}></div>
          </>
        ) : (
          <>
            <div style={{ height: "14px" }}></div>
            <div
              style={{
                height: "152px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {inProgressList.map((item, index) => {
                return (
                  <MeetupList
                    key={item.partyId}
                    meetupId={item.partyId}
                    title={item.title}
                    image={
                      item.partyImageUrl === "" ? undefined : item.partyImageUrl
                    }
                    date={item.partyDate}
                    location={item.location}
                    userImg={item.openMemberProfileImageUrl}
                    userName={item.openMemberName}
                    currentNum={item.joinMemberCount}
                    maxNum={item.maxCapacity}
                  ></MeetupList>
                );
              })}
            </div>
            <div style={{ height: "22px" }}></div>
          </>
        )}

        <div
          style={{
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "var(--on-surface-active, #0A0A0A)",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "150%",
          }}
        >
          <div>완료</div>
          <ArrowImg
            id="3"
            onClick={handleArrowBtnClick}
            style={{ cursor: "pointer" }}
          />
        </div>

        {completedList.length === 0 ? (
          <>
            <div style={{ height: "48px" }}></div>
            <div
              style={{
                height: "46px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--on-surface-muted, rgba(10, 10, 10, 0.45))",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {loading ? <LoadingSpinner /> : "참여한\n모임이 없어요"}
            </div>
            <div style={{ height: "94px" }}></div>
          </>
        ) : (
          <>
            <div style={{ height: "14px" }}></div>
            <div
              style={{
                height: "152px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {completedList.map((item, index) => {
                return (
                  <MeetupList
                    key={item.partyId}
                    meetupId={item.partyId}
                    title={item.title}
                    image={
                      item.partyImageUrl === "" ? undefined : item.partyImageUrl
                    }
                    date={item.partyDate}
                    location={item.location}
                    userImg={item.openMemberProfileImageUrl}
                    userName={item.openMemberName}
                    currentNum={item.joinMemberCount}
                    maxNum={item.maxCapacity}
                    isEnd={true}
                  ></MeetupList>
                );
              })}
            </div>
            <div style={{ height: "36px" }}></div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileMeetup;

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
