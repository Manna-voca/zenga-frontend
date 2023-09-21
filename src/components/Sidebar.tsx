import React from "react";
import { useState, useEffect } from "react";
import ChannelList from "./ChannelList";
import axios from "axios";
import { ReactComponent as HomeImg } from "../images/home.svg";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const CONFIG = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      'Content-Type':'application/json'
    },
  };

  const [channelList, setChannelList] = useState<Array<any>>([]);

  useEffect(() => {
    axios.get(`${SERVER_URL}/channels`, CONFIG).then((res) => {
      setChannelList(res.data.data);
    }).catch((err) => console.error(err));
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
            marginLeft: "21px",
            marginRight: "21px",
            fontSize: "21px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "150%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <span>채널 변경</span>
          <HomeImg onClick={() => navigate('/channel-home')} style={{ cursor: "pointer" }}/>
        </div>
        <ChannelList type="new"></ChannelList>
        {channelList.map((item, index) => {
          return <ChannelList key={index} name={item.name} img={item.logoImageUrl} code={item.code} memberId={item.memberId}/>;
        })}
      </div>
    </>
  );
};

export default Sidebar;
