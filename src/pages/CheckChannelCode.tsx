import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CheckChannelCode = () => {
  const { channelCode } = useParams();
  const navigate = useNavigate();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const checkValidation = async () => {
    try {
      if (!ACCESS_TOKEN) {
        if (channelCode) {
          localStorage.setItem("redirectChannelCode", channelCode);
        }
        navigate("/");
        return;
      } else {
        localStorage.removeItem("redirectChannelCode");
        const res = await axios.get(`${SERVER_URL}/channels`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        if (res.data) {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].code === channelCode) {
              localStorage.setItem("memberId", res.data.data[i].memberId);
              navigate(`/${channelCode}/praise`, { replace: true });
              return;
            }
          }
          if (channelCode) {
            localStorage.setItem("redirectChannelCode", channelCode);
            navigate("/create-channel/old-onboarding", { replace: true });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkValidation();
  }, []);

  return null;
};

export default CheckChannelCode;

// 1. 채널 링크로 들어온다
// 2. tokenRefresh 무시한다
// 3. CheckChannelCode로 와서 로그인 검사한다
//   3-1. 로그인이 안되어 있으면 로컬 스토리지에 redirectChannelCode를 저장한다
//     3-1-1. 로그인으로 보낸다
//     3-1-2. 로그인 후 요기로 온다.
// 4. 로그인이 되어 있으면 억섹스 토큰있으니까 api로 채널 멤버 맞는지 확인한다 + removeChannelCode
//   4-1. 채널 멤버면 navigate('/channelCode/praise')
//   4-2. 채널 멤버 아니면 navigate("/create-channel/new-onboarding", { channelCode: channelCode })
