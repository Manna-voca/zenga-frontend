import React from "react";
import { useState, useEffect } from "react";
import ChannelList from "./ChannelList";
import axios from "axios";

const Sidebar = () => {

  const [channelList, setChannelList] = useState<Array<any>>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/channels`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_ACCESSTOKEN}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res.data.data);
      setChannelList(res.data.data);
    });
  }, [])

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
        {channelList.map((item, index) => {
          return <ChannelList key={index} name={item.name} img={item.logoImageUrl} />;
        })}
      </div>
    </>
  );
};

export default Sidebar;
