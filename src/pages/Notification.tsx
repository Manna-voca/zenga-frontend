import { useState, useEffect } from "react";
import Header from "../components/Header";
import { color } from "../styles/color";
import { typography } from "../styles/typography";
import axios from "axios";

interface OwnProps {
  id: number;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
}

const NotificationWrapper = ({
  id,
  title,
  content,
  date,
  isRead,
}: OwnProps) => {
  const formatDate = (notificationDate: string) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const newDate = new Date(notificationDate);
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const day = daysOfWeek[newDate.getDay()];
    const hour = String(newDate.getHours()).padStart(2, "0");
    const minute = String(newDate.getMinutes()).padStart(2, "0");

    return `${month}월 ${date}일(${day}) ${hour}:${minute}`;
  };

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
        {formatDate(date)}
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

  const [notifications, setNotifications] = useState<Array<OwnProps>>();

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/notification/member/${MEMBER_ID}`,
        CONFIG
      );
      if (res.data && res.status === 200) {
        const newList = res.data.data.notificationList.map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          date: item.createdDate,
          isRead: item.check,
        }));
        setNotifications(newList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const readAllNotifications = async () => {
    try {
      await axios
        .put(
          `${SERVER_URL}/notification/check-all/member/${MEMBER_ID}`,
          {},
          CONFIG
        )
        .then();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    readAllNotifications();
  }, []);

  return (
    <>
      <Header type="back" text="알림" />
      {notifications?.map((item, index) => {
        return (
          <NotificationWrapper
            key={index}
            id={item.id}
            title={item.title}
            content={item.content}
            date={item.date}
            isRead={item.isRead}
          />
        );
      })}
    </>
  );
}
