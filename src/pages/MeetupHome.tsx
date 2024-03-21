/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import { color } from "../styles/color";
import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { ReactComponent as WhiteplusImg } from "../images/whiteplus.svg";
import { ReactComponent as TwowhaleImg } from "../images/twowhale.svg";
import GatheringList from "../components/GatheringList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../apis/axiosInstance";

const MeetupHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const meetupId = searchParams.get("meetupId");
  const { channelCode } = useParams();

  const [width, setWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadState, setLoadState] = useState<boolean>(false);
  const [isLess10, setIsLess10] = useState<boolean>(false);
  const [meetupList, setMeetupList] = useState<Array<any>>([]);
  const [cursorMeetupId, setCursorMeetupId] = useState<number>();
  const [hasNext, setHasNext] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const getMeetupInfo = async () => {
    if (loading) return;
    try {
      const uri =
        `/party/list?channelId=${localStorage.getItem("channelId")}` +
        (cursorMeetupId ? `&partyId=${cursorMeetupId}` : "") +
        "&size=15";
      if (hasNext === false) return;
      setLoading(true);
      await axiosInstance.get(`${uri}`).then((res) => {
        setMeetupList((prev) => [...prev, ...res.data.data.content]);
        if (res.data.data.hasNext === false) {
          setHasNext(false);
          setCursorMeetupId(
            Number(
              res.data.data.content[res.data.data.content.length - 1].partyId
            )
          );
        } else {
          setCursorMeetupId(
            Number(
              res.data.data.content[res.data.data.content.length - 1].partyId
            )
          );
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadState(true);
    }
  };

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollHeight - containerRef.current.scrollTop <=
        containerRef.current.clientHeight + 1
    ) {
      getMeetupInfo();
    }
  };

  const confirmChannelUser = async () => {
    try {
      const res1 = await axiosInstance.get(
        `/channels/info?code=${channelCode}`
      );
      const res2 = await axiosInstance.get(`/channels`);

      for (let i = 0; i < res2.data.data.length; i++) {
        if (res2.data.data[i].id === res1.data.data.id) {
          localStorage.setItem("memberId", res2.data.data[i].memberId);
          localStorage.setItem("channelId", res1.data.data.id);
          window.history.replaceState(
            {},
            "",
            `${window.location.origin}${window.location.pathname}`
          );
          navigate(`/${channelCode}/meetup-detail/${meetupId}`);
          return;
        }
      }

      alert("해당 채널의 멤버가 아니라 접근이 불가합니다");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (meetupId !== null) {
      confirmChannelUser();
    } else {
      axiosInstance
        .get(`/channels/${localStorage.getItem("channelId")}/validity`)
        .then((res) => {
          setIsLess10(!res.data.data.isValid);
        })
        .catch((err) => console.error(err));

      getMeetupInfo();
    }

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "20",
          }}
        >
          <LoadingSpinner />
        </div>
      )}
      {isLess10 ? (
        <>
          <div style={{ height: "162px" }}></div>
          <div
            style={{
              display: "flex",
              height: "140px",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <TwowhaleImg />
            <div
              style={{
                color: "var(--on-surface-active, #0A0A0A)",
                textAlign: "center",
                fontSize: "16px",
                fontStyle: "normal",
                lineHeight: "150%",
              }}
            >
              <span style={{ fontWeight: "600" }}>멤버 10명</span>
              <span style={{ fontWeight: "400" }}>
                이 넘어야<br></br>모임을 만들 수 있어요
              </span>
            </div>
          </div>
        </>
      ) : loadState ? (
        <>
          {meetupList.length === 0 ? (
            <>
              <div style={{ height: "162px" }}></div>
              <div
                style={{
                  display: "flex",
                  height: "140px",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <TwowhaleImg />
                <div
                  style={{
                    color: "var(--on-surface-active, #0A0A0A)",
                    textAlign: "center",
                    fontSize: "16px",
                    fontStyle: "normal",
                    lineHeight: "150%",
                  }}
                >
                  <span style={{ fontWeight: "400" }}>아직&nbsp;</span>
                  <span style={{ fontWeight: "600" }}>모임</span>
                  <span style={{ fontWeight: "400" }}>이 없어요</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ height: "20px" }}></div>
              <div
                ref={containerRef}
                onScroll={handleScroll}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "calc(100vh - 125px)",
                  maxHeight: "calc(100vh - 125px)",
                  overflowY: "scroll",
                  position: "relative",
                  gap: "8px",
                }}
              >
                {meetupList.map((item, index) => {
                  return (
                    <div style={{ margin: "0 20px 0 20px" }}>
                      <GatheringList
                        key={item.partyId}
                        title={item.title}
                        image={
                          item.partyImageUrl === ""
                            ? undefined
                            : item.partyImageUrl
                        }
                        date={item.partyDate}
                        location={item.location}
                        userImg={item.openMemberProfileImageUrl}
                        userName={item.openMemberName}
                        currentNum={item.joinMemberCount}
                        maxNum={item.maxCapacity}
                        meetupId={item.partyId}
                      />
                    </div>
                  );
                })}
                <div style={{ height: "57px" }}></div>
              </div>
            </>
          )}
          <div
            onClick={() => navigate(`/${channelCode}/create-meetup`)}
            style={{
              height: "60px",
              width: "60px",
              borderRadius: "30px",
              background: "var(--primary-primary-500, #1F94FF)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              boxSizing: "border-box",
              bottom: "65px",
              cursor: "pointer",
              right: width >= 500 ? "calc(50% - 230px)" : "20px",
            }}
          >
            <WhiteplusImg />
          </div>
        </>
      ) : (
        <></>
      )}
      <Navbar state={2}></Navbar>
    </>
  );
};

export default MeetupHome;

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
