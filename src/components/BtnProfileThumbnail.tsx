import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularImage from "./CircularImage";

interface Props {
  userImg: string;
  userName: string;
  userId: number;
}

const BtnProfileThumbnail = ({ userImg, userName, userId }: Props) => {
  const navigate = useNavigate();
  const { channelCode } = useParams();

  const handleProfileClick = () => {
    if (`${userId}` === localStorage.getItem("memberId")) {
      navigate(`/${channelCode}/mypage`);
    } else {
      navigate(`/${channelCode}/memberpage/${userId}`);
    }
  };

  return (
    <>
      <div
        onClick={handleProfileClick}
        title={userName}
        style={{
          width: "46px",
          height: "56px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          cursor: "pointer",
        }}
      >
        <CircularImage size="36" image={userImg} />
        <div
          style={{
            height: "16px",
            width: "46px",
            display: "block",
            alignItems: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "var(--on-surface-default, rgba(10, 10, 10, 0.70))",
            textAlign: "center",
            fontSize: "11px",
            fontStyle: "normal",
            fontWeight: "500",
            wordBreak: "break-all",
          }}
        >
          {userName}
        </div>
      </div>
    </>
  );
};

export default BtnProfileThumbnail;
