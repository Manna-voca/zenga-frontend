/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { typography } from "../styles/typography";
import { color } from "../styles/color";

import btnChannelAdd from "../assets/icons/btn-channel-add.svg";
import exChannel_1 from "../assets/images/ex-channel-1.png";
import exChannel_2 from "../assets/images/ex-channel-2.png";
import exChannel_3 from "../assets/images/ex-channel-3.png";

import CircularImage from "../components/CircularImage";
import { useNavigate } from "react-router-dom";

export default function ChannelHome() {
  const channelDummy = [
    {
      image: exChannel_1,
      name: "모아모아 모아모아 2기",
    },
    { image: exChannel_2, name: "롤칼바람나락 good 동아리 3기 good" },
    { image: exChannel_3, name: "멋쟁이 사자처럼 sdfasfsdfasdfadf fdssadfsafd" },
    { image: exChannel_1, name: "곰돌이  곰돌이이 adfasdfsfdasfasdfadsfasdd" },
    { image: exChannel_3, name: "멋쟁이 사자처럼sdfasfsdfasdfadf fdssadfsafd" },
    { image: exChannel_2, name: "모아모아aasdfasdfasfdsafsafadfafsafadfsaf" },
  ];
  const navigate = useNavigate();
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
          gap: "30px 5px",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <div onClick={() => navigate("/createchannel")} css={ChannelDivStyle}>
          <CircularImage image={btnChannelAdd} size="98" />
        </div>
        {channelDummy.map((item) => {
          return (
            <div onClick={() => navigate("/home")} css={ChannelDivStyle}>
              <CircularImage image={item.image} size="98" />
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
  flex: calc(33% - 20px);
  flex-grow: 0;
  flex-direction: column;
  width: 98px;
  color: ${color.onSurfaceDefault};
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;
