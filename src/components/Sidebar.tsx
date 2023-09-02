import React from "react";
import ChannelList from "./ChannelList";

interface ChannelProps {
  // channelImage: string;
  channelName: string;
  // channelId: number;
}

const Sidebar = () => {
  const channelDummy: Array<ChannelProps> = [
    {channelName: "가나다"},
    {channelName: "가나다"},
    {channelName: "가나다"},
    {channelName: "가나다"},
    {channelName: "가나다"},
    {channelName: "가나다"},
    {channelName: "가나다"},
    {channelName: "가나다"},
    {channelName: "가나다"},
  ];
  return (
    <>
      <div
        style={{
          width: "300px",
          height: "100%",
          position: "fixed",
          top: "0px",
          backgroundColor: "white",
          zIndex: "2",
          overflow: "scroll",
        }}
      >
        <div
          style={{
            height: "44px",
            marginLeft: "20px",
            fontSize: "21px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "150%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>채널 변경</span>
        </div>
        <ChannelList type="new"></ChannelList>
        {channelDummy.map((item, index) => {
          return <ChannelList key={index} name={item.channelName} />;
        })}
      </div>
    </>
  );
};

export default Sidebar;
