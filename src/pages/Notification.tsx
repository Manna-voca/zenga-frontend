import { useState, useEffect } from "react";
import Header from "../components/Header";
import { color } from "../styles/color";
import { typography } from "../styles/typography";
import axios from "axios";

interface OwnProps {
  title: string;
  content: string;
  date: string;
  isRead: boolean;
}

const NotificationWrapper = ({ title, content, date, isRead }: OwnProps) => {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "19.5px 20px 13px 20px",
        backgroundColor: isRead ? `${color.background}` : `${color.primary50}`,
      }}
    >
      <h1 style={{ ...typography.body2Medium, color: "#0D0D0D" }}>{title}</h1>
      <h2
        style={{
          ...typography.body3Regular,
          color: "#565656",
          margin: "1px 0 5px",
        }}
      >
        {content}
      </h2>
      <span
        style={{
          ...typography.caption1Regular,
          color: `${color.onSurfaceDefault}`,
        }}
      >
        {date}
      </span>
    </article>
  );
};

export default function Notification() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const CONFIG = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };
  const MEMBER_ID = localStorage.getItem("memberId");

  const [notifications, setNotifications] = useState();

  const fetchNotifications = async () => {
    try {
      await axios
        .get(`${SERVER_URL}/notification/member/${MEMBER_ID}`, CONFIG)
        .then((res) => {
          console.log(res.data);
        });
      // .catch((err) => {
      //   console.log(err.response.data.errorCode);
      //   if (err.response.data.errorCode === (7000 || 7001)) {
      //     console.log("토큰 에러");
      //   }
      // });
    } catch (error) {
      const err = error as any;
      if (err.response.data.errorCode === (7000 || 7001)) {
        console.log("토큰 에러");
      }
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <Header type="back" />
      <NotificationWrapper
        title="누군가 나를 칭찬했어요 !"
        content="칭찬: 우리 동아리에서 당근 마켓 온도 99도 일 것 같은 사람은?"
        date="7월 13일(목) 21:05"
        isRead={false}
      />
      <NotificationWrapper
        title="누군가 나를 칭찬했어요 !"
        content="칭찬: 우리 동아리에서 당근 마켓 온도 99도 일 것 같은 사람은?"
        date="7월 13일(목) 21:05"
        isRead={true}
      />
    </>
  );
}
