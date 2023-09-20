/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { typography } from "../styles/typography";
import { color } from "../styles/color";
import btnChannelAdd from "../assets/icons/btn-channel-add.svg";
import CircularImage from "../components/CircularImage";
import axios from "axios";

interface ChannelProps {
  code: string;
  id: number;
  logoImageUrl: string;
  name: string;
}

export default function ChannelHome() {
  const navigate = useNavigate();
  const [channelList, setChannelList] = useState<Array<ChannelProps>>();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const CONFIG = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };

  const fetchChannelData = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/channels`, CONFIG);
      if (res.data && res.data.data) {
        setChannelList(res.data.data as Array<ChannelProps>);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChannelClick = async (item: any) => {
    try {
      localStorage.setItem("memberId", item.memberId);
      localStorage.setItem("id", item.id);
      navigate(`/${item.code}/praise`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("praise");
    if (localStorage.getItem("redirectChannelCode")) {
      navigate("/" + localStorage.getItem("redirectChannelCode"));
    }
    fetchChannelData();
  }, []);

  // 사이드바 열린 채로 뒤로가기를 하여 channel-home으로 이동 시
  // 스크롤 막히는거 방지
  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "unset";
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
        }}
      >
        <Player
          autoplay
          loop
          src="https://lottie.host/8a8e9329-7513-4385-9f13-c33f22237087/CcjUoVFNUc.json"
          style={{
            width: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "-1",
          }}
        />
      </div>
      <h1
        style={{
          padding: "40px 20px 0 20px",
          zIndex: "3",
          position: "relative",
          ...typography.heading1Semibold,
          color: `${color.onSecondaryActive}`,
          marginBottom: "100px",
        }}
      >
        {channelList ? "채널을 선택해 주세요!" : "채널을 생성해 보세요!"}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px 2%",
          padding: "0 20px",
        }}
      >
        <div onClick={() => navigate("/create-channel")} css={ChannelDivStyle}>
          <CircularImage image={btnChannelAdd} size="98" />
        </div>
        {channelList?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleChannelClick(item)}
              css={ChannelDivStyle}
            >
              <CircularImage image={item.logoImageUrl} size="98" />
              <div
                css={css`
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                `}
                style={{
                  boxSizing: "border-box",
                  padding: "0 4px",
                  width: "90px",
                  textAlign: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  wordBreak: "break-all",
                }}
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChannelDivStyle = css`
  display: flex;
  flex: 32%;
  flex-grow: 0;
  flex-direction: column;
  color: ${color.onSurfaceDefault};
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;
