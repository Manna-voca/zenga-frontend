import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import CheckLottie from "../lotties/channelCreateCompleteLottie.json";
import Header from "../components/Header";
import InputText from "../components/InputText";
import ButtonBasic from "../components/ButtonBasic";
import TextField from "../components/TextField";
import { color } from "../styles/color";
import InputProfile from "../components/InputProfile";
import axios from "axios";


const OldChannelOnboarding = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [code, setCode] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };
  const handleIntroChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > 50) {
      event.target.value = event.target.value.slice(0, 50);
    }
    setIntro(event.target.value);
  };

  const [userProfileImage, setUserProfileImage] = useState<
    string | ArrayBuffer | null
  >();
  const [userImageFile, setUserImageFile] = useState<File | null>(null);

  const handleUserProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setUserImageFile(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setUserProfileImage(reader.result);
      };
    }
    event.target.value = "";
  };

  const [errorState, setErrorState] = useState<boolean>(false);
  const [channelId, setChannelId] = useState<any>();

  const handleButtonClick = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_ACCESSTOKEN}`
      }
    };
    if(step === 1){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/channels/info?code=${code}`, config).then((res) => {
        console.log(res);
        setChannelId(res.data.data.id);
        setStep((current) => current + 1);
        setPreventPopstate(true);
      }).catch((err) => {
        console.log(err);
        if(err.code === 1500){
          setErrorState(true);
        }
      });
    }
    if(step === 2){
      // 이미지 저장하는 부분
      if(userImageFile !== null){
        const userImgFormData = new FormData();
        userImgFormData.append('image', userImageFile);
        const uploadUserImgResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/image/upload`, userImgFormData, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_ACCESSTOKEN}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        if(uploadUserImgResponse.status === 200){
          console.log(uploadUserImgResponse.data.data);
          const userFormData = new FormData();
          userFormData.append('channelId', channelId);
          userFormData.append('profileImageUrl', uploadUserImgResponse.data.data.url);
          userFormData.append('nickname', nickname);
          userFormData.append('introduction', intro);
          userFormData.append('level', "NORMAL");
          axios.post(`${process.env.REACT_APP_SERVER_URL}/members`, userFormData, config).then((res) => {
            console.log(res);
            setStep((current) => current + 1);
          }).catch((err) => console.log(err));
        }
      }
      else{
        // 이미지 안 넣었을 때
        const userFormData = new FormData();
        userFormData.append('channelId', channelId);
        userFormData.append('profileImageUrl', 'https://zenga-backend-bucket.s3.ap-northeast-2.amazonaws.com/fdf39cb8-dea7-4cf1-a553-07c66821b969.png');
        userFormData.append('nickname', nickname);
        userFormData.append('introduction', intro);
        userFormData.append('level', "NORMAL");
        axios.post(`${process.env.REACT_APP_SERVER_URL}/members`, userFormData, config).then((res) => {
          console.log(res);
          setStep((current) => current + 1);
        }).catch((err) => console.log(err));
      }
    }
  };


  const [preventPopState, setPreventPopstate] = useState<boolean>(false);
  useEffect(() => {
        if(preventPopState){
            window.history.pushState(null, "", "");
            window.onpopstate = () => {
                setStep((current) => (current - 1));
                setPreventPopstate((current) => !(current));
            };
        }
  }, [preventPopState]);

  return (
    <>
      {step === 1 || step === 2 ? (
        <Header type="back"></Header>
      ) : (
        <div style={{ height: "44px" }}></div>
      )}
      <div style={{ height: "16px" }}></div>

      {step === 1 || step === 2 ? (
        <>
          <div
            style={{
              width: "350px",
              height: "59px",
              lineHeight: "150%",
              marginLeft: "20px",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "600",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: "0",
            }}
          >
            <span>
              {step === 1 ? "초대받은 채널의" : "채널에서 사용할 정보를"}
              <br></br>
              {step === 1 ? "코드를 입력해 주세요" : "입력해 주세요"}
            </span>
          </div>
          <div style={{ height: step === 1 ? "60px" : "40px" }}></div>
        </>
      ) : (
        <>
          <div
            style={{
              width: "274px",
              height: "30px",
              lineHeight: "150%",
              marginLeft: "20px",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "600",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: "0",
            }}
          >
            <span>채널이 생성되었어요!</span>
          </div>
          <div style={{ height: "114px" }}></div>
          <Player
            onEvent={(event) => {
              if (event === "complete")
                setTimeout(() => {
                  navigate("/praise", { replace: true });
                }, 500);
            }}
            autoplay
            keepLastFrame
            src={CheckLottie}
            style={{
              width: "181px",
              height: "181px",
            }}
          />
        </>
      )}

      {step === 1 && (
        <>
          <div style={{ margin: "0 20px 0 20px" }}>
            <InputText
              isNecessary={false}
              label="코드"
              placeholder="8자리 코드를 입력해 주세요"
              value={code}
              onChange={handleCodeChange}
              errorStatus={errorState}
              onErrorHelpMessage="없는 코드입니다."
            />
            <div style={{ height: "399px" }}></div>
          </div>
          <div
            style={{
              margin: "0",
              background: `${color.background}`,
              position: "fixed",
              bottom: "0",
              maxWidth: "500px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              height: "47px",
              padding: "8px 0",
            }}
          >
            <div style={{ width: "calc(100% - 40px)", maxWidth: "460px" }}>
              <ButtonBasic
                innerText="채널 입장하기"
                onClick={handleButtonClick}
                disable={code.length !== 8}
              ></ButtonBasic>
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div style={{ marginLeft: "20px" }}>
            <InputProfile
              image={userProfileImage}
              handleProfileImageUpload={handleUserProfileImageUpload}
            ></InputProfile>
          </div>
          <div style={{ height: "40px" }}></div>
          <div style={{ margin: "0 20px 0 20px" }}>
            <InputText
              isNecessary={true}
              label="닉네임"
              placeholder="닉네임을 입력해 주세요."
              value={nickname}
              onChange={handleNicknameChange}
            />
            <div style={{ height: "32px" }}></div>
            <TextField
              label="자기소개"
              placeholder="나를 한줄로 소개해 보세요."
              value={intro}
              onChange={handleIntroChange}
              maxLength={50}
            />
            <div style={{ height: "44px" }}></div>
          </div>
          <div
            style={{
              margin: "0",
              background: `${color.background}`,
              position: "fixed",
              bottom: "0",
              maxWidth: "500px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              height: "47px",
              padding: "8px 0",
            }}
          >
            <div style={{ width: "calc(100% - 40px)", maxWidth: "460px" }}>
              <ButtonBasic
                innerText="확인"
                onClick={handleButtonClick}
                disable={nickname === ""}
              ></ButtonBasic>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OldChannelOnboarding;
