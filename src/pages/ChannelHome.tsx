/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { typography } from "../styles/typography";
import { color } from "../styles/color";

import btnChannelAdd from "../assets/icons/btn-channel-add.svg";
import exChannel_1 from "../assets/images/ex-channel-1.png";
import exChannel_2 from "../assets/images/ex-channel-2.png";
import exChannel_3 from "../assets/images/ex-channel-3.png";

import CircularImage from "../components/CircularImage";
import { get } from "../api/api";
import axios, { AxiosResponse } from "axios";

interface ChannelProps {
  code: string;
  id: number;
  logoImageUrl: string;
  name: string;
}

export default function ChannelHome() {
  const navigate = useNavigate();
  // const channelDummy = [
  //   {
  //     image: exChannel_1,
  //     name: "모아모아 모아모아 2기",
  //   },
  //   { image: exChannel_2, name: "롤 칼바람 나락 good 동아리 3기 good" },
  //   {
  //     image: exChannel_3,
  //     name: "멋쟁이 사자처럼 12기",
  //   },
  //   { image: exChannel_1, name: "곰돌이  곰돌이이 adfasdfsfdasfasdfadsfasdd" },
  //   // { image: exChannel_3, name: "멋쟁이 사자처럼sdfasfsdfasdfadf fdssadfsafd" },
  //   // { image: exChannel_2, name: "모아모아aasdfasdfasfdsafsafadfafsafadfsaf" },
  // ];

  const [channelList, setChannelList] = useState<Array<ChannelProps>>();

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const CONFIG = {
    headers: {
      // Authorization: "Bearer " + localStorage.getItem("accessToken"),
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM5MjA3MTAsImV4cCI6MTY5NzUyMDcxMCwic3ViIjoiMSIsIlRPS0VOX1RZUEUiOiJBQ0NFU1NfVE9LRU4ifQ.IT2kHS9XkWMI_Q92nrYmaKHtq8qlb_f55bWqQBP09JI",
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
      navigate(`/${item.code}/praise`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChannelData();
  }, []);

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
        채널을 생성해 보세요 !
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
