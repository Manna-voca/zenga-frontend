import { useState, useEffect } from "react";
import ChannelList from "./ChannelList";
import { axiosInstance } from "../apis/axiosInstance";
import { ReactComponent as HomeImg } from "../images/home.svg";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [channelList, setChannelList] = useState<Array<any>>([]);

  useEffect(() => {
    axiosInstance
      .get(`/channels`)
      .then((res) => {
        setChannelList(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

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
            justifyContent: "space-between",
          }}
        >
          <span>채널 변경</span>
          <HomeImg
            onClick={() => navigate("/channel-home")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <ChannelList type="new"></ChannelList>
        {channelList.map((item, index) => {
          return (
            <ChannelList
              key={index}
              name={item.name}
              img={item.logoImageUrl}
              code={item.code}
              memberId={item.memberId}
            />
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
