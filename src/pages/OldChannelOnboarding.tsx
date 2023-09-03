import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import CheckLottie from "../lotties/channelCreateCompleteLottie.json";
import Header from "../components/Header";
import InputText from "../components/InputText";
import ButtonBasic from "../components/ButtonBasic";
import TextField from "../components/TextField";
import { color } from "../styles/color";
import InputProfile from "../components/InputProfile";

// 기존 뒤로가기 기능과 상단의 버튼을 통해 뒤로가기에 대해 이전 단계로 돌아가도록 추후 구현

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
    setIntro(event.target.value);
  };

  const [userProfileImage, setUserProfileImage] = useState<
    string | ArrayBuffer | null
  >();
  const [userImageFile, setUserImageFile] = useState<File | null>();

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

  const handleButtonClick = () => {
    console.log(step);
    setStep((current) => current + 1);
    if (step === 3) {
      navigate("/praise", { replace: true });
    }
  };

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
              errorStatus={code.length > 0 && code !== "good"}
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
                disable={code === ""}
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
