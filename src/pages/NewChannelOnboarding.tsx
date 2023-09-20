import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import CheckLottie from "../lotties/channelCreateCompleteLottie.json";
import Header from '../components/Header';
import InputText from '../components/InputText';
import ButtonBasic from '../components/ButtonBasic';
import TextField from '../components/TextField';
import BtnInfoDuplicate from '../components/BtnInfoDuplicate';
import InputProfile from '../components/InputProfile';
import defaultChannelProfile from '../images/defaultchannelprofile.png';
import { color } from "../styles/color";
import axios from 'axios';
import { debounce } from 'lodash';

// 기존 뒤로가기 기능과 상단의 버튼을 통해 뒤로가기에 대해 이전 단계로 돌아가도록 추후 구현

const NewChannelOnboarding = () => {
    const navigate = useNavigate();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };

    const [memberId, setMemberId] = useState<number>();
    const [step, setStep] = useState<number>(1);
    const [clubname, setClubname] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [intro, setIntro] = useState<string>("");
    const [lottieState, setLottieState] = useState<boolean>(true);
    const [preventPopState, setPreventPopstate] = useState<boolean>(false);

    useEffect(() => {
        if(preventPopState){
            window.history.pushState(null, "", "");
            window.onpopstate = () => {
                setStep((current) => (current - 1));
                setPreventPopstate((current) => !(current));
            };
        }
        else{
            if(step === 3){
                window.onpopstate = () => {};
            }
        }
    }, [preventPopState]);

    const handleClubnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClubname(event.target.value);
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

    const [channelProfileImage, setChannelProfileImage] = useState<string | ArrayBuffer | null>();
    const [channelImageFile, setChannelImageFile] = useState<File | null>(null);

    const handleChannelProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if(files.length > 0){
            setChannelImageFile(files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                setChannelProfileImage(reader.result);
            };
        }
        event.target.value = "";
    };

    const [adminProfileImage, setAdminProfileImage] = useState<string | ArrayBuffer | null>();
    const [adminImageFile, setAdminImageFile] = useState<File | null>(null);

    const handleAdminProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if(files.length > 0){
            setAdminImageFile(files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                setAdminProfileImage(reader.result);
            };
        }
        event.target.value = "";
    };

    const [code, setCode] = useState<string>("");

    const handleNextButtonClick = debounce(async () => {
        if(step === 1){
            setStep((current) => (current) + 1);
            setPreventPopstate(true);
        }
        if(step === 2){
            if(channelImageFile !== null){
                const channelImgFormData = new FormData();
                channelImgFormData.append('image', channelImageFile);
                const uploadChannelImgResponse = await axios.post(`${SERVER_URL}/image/upload`, channelImgFormData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if(uploadChannelImgResponse.status === 200){
                    const channelFormData = new FormData();
                    channelFormData.append('name', clubname);
                    channelFormData.append('logoImageUrl', uploadChannelImgResponse.data.data.url);
                    const channelDataResponse = await axios.post(`${SERVER_URL}/channels`, {name: clubname, logoImageUrl: uploadChannelImgResponse.data.data.url}, CONFIG);
                    if(channelDataResponse.status === 200){
                        if(adminImageFile !== null){
                            const adminImgFormData = new FormData();
                            adminImgFormData.append('image', adminImageFile);
                            const uploadAdminImgResponse = await axios.post(`${SERVER_URL}/image/upload`, adminImgFormData, {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                                    'Content-Type': 'multipart/form-data'
                                }
                            });
                            if(uploadAdminImgResponse.status === 200){
                                const adminFormData = new FormData();
                                adminFormData.append('channelId', channelDataResponse.data.data.id);
                                adminFormData.append('profileImageUrl', uploadAdminImgResponse.data.data.url);
                                adminFormData.append('nickname', nickname);
                                adminFormData.append('introduction', intro);
                                adminFormData.append('level', 'MAINTAINER');
                                const adminDataResponse = await axios.post(`${SERVER_URL}/members`, adminFormData, CONFIG);
                                if(adminDataResponse.status === 200){
                                    setCode(channelDataResponse.data.data.code);
                                    setMemberId(adminDataResponse.data.data.id);
                                    setStep((current) => (current) + 1);
                                    setPreventPopstate(false);
                                }
                            }

                        }
                        else{
                            // 참여자 이미지 없을 때
                            const adminFormData = new FormData();
                            adminFormData.append('channelId', channelDataResponse.data.data.id);
                            adminFormData.append('profileImageUrl', 'https://image.zenga.club/fdf39cb8-dea7-4cf1-a553-07c66821b969.png');
                            adminFormData.append('nickname', nickname);
                            adminFormData.append('introduction', intro);
                            adminFormData.append('level', 'MAINTAINER');
                            const adminDataResponse = await axios.post(`${SERVER_URL}/members`, adminFormData, CONFIG);
                            if(adminDataResponse.status === 200){
                                setCode(channelDataResponse.data.data.code);
                                setMemberId(adminDataResponse.data.data.id);
                                setStep((current) => (current) + 1);
                                setPreventPopstate(false);
                            }
                        }
                    }
                }
            }
            else{
                // 채널 이미지 없을 때
                const channelFormData = new FormData();
                channelFormData.append('name', clubname);
                channelFormData.append('logoImageUrl', 'https://image.zenga.club/fdf39cb8-dea7-4cf1-a553-07c66821b969.png');
                const channelDataResponse = await axios.post(`${SERVER_URL}/channels`, channelFormData, CONFIG);
                if(channelDataResponse.status === 200){
                    if(adminImageFile !== null){
                        const adminImgFormData = new FormData();
                        adminImgFormData.append('image', adminImageFile);
                        const uploadAdminImgResponse = await axios.post(`${SERVER_URL}/image/upload`, adminImgFormData, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        if(uploadAdminImgResponse.status === 200){
                            const adminFormData = new FormData();
                            adminFormData.append('channelId', channelDataResponse.data.data.id);
                            adminFormData.append('profileImageUrl', uploadAdminImgResponse.data.data.url);
                            adminFormData.append('nickname', nickname);
                            adminFormData.append('introduction', intro);
                            adminFormData.append('level', 'MAINTAINER');
                            const adminDataResponse = await axios.post(`${SERVER_URL}/members`, adminFormData, CONFIG);
                            if(adminDataResponse.status === 200){
                                setCode(channelDataResponse.data.data.code);
                                setMemberId(adminDataResponse.data.data.id);
                                setStep((current) => (current) + 1);
                                setPreventPopstate(false);
                            }
                        }

                    }
                    else{
                        // 참여자 이미지 없을 때
                        const adminFormData = new FormData();
                        adminFormData.append('channelId', channelDataResponse.data.data.id);
                        adminFormData.append('profileImageUrl', 'https://image.zenga.club/fdf39cb8-dea7-4cf1-a553-07c66821b969.png');
                        adminFormData.append('nickname', nickname);
                        adminFormData.append('introduction', intro);
                        adminFormData.append('level', 'MAINTAINER');
                        const adminDataResponse = await axios.post(`${SERVER_URL}/members`, adminFormData, CONFIG);
                        if(adminDataResponse.status === 200){
                            setCode(channelDataResponse.data.data.code);
                            setMemberId(adminDataResponse.data.data.id);
                            setStep((current) => (current) + 1);
                            setPreventPopstate(false);
                        }
                    }
                }
            }
        }
    }, 1000);

    return(
        <>
            {step === 1 || step === 2 ? (
                <Header type='back'></Header>
            ) : (
                <div></div>
            )}
            <div style={{ height: '16px' }}></div>
            
            {step === 1 || step === 2 ? (
                <>
                    <div
                        style={{ width: '274px', height: '59px',
                                lineHeight: '150%', marginLeft: '20px',
                                fontSize: '24px', fontStyle: 'normal',
                                fontWeight: '600',
                                display: 'flex', flexDirection: 'column',
                                justifyContent: 'center', flexShrink: '0'
                    }}>
                        <span>{step === 1 ? '채널 정보를' : '방장의 정보를'}<br></br>입력해 주세요</span>
                    </div>
                    <div style={{ height: '40px' }}></div>
                </>
            ) : (
                <>
                    <div
                        style={{ width: '274px', height: '30px',
                                lineHeight: '150%', marginLeft: '20px',
                                fontSize: '24px', fontStyle: 'normal',
                                fontWeight: '600',
                                display: 'flex', flexDirection: 'column',
                                justifyContent: 'center', flexShrink: '0'
                    }}>
                        <span>채널이 생성되었어요!</span>
                    </div>
                    <div style={{ height: '4px' }}></div>
                    <div
                        style={{ width: '350px', height: '30px',
                                lineHeight: '150%', marginLeft: '20px',
                                fontSize: '16px', fontStyle: 'normal',
                                fontWeight: '400',
                                display: 'flex', flexDirection: 'column',
                                justifyContent: 'center', flexShrink: '0'

                    }}>
                        <span>2가지 방법으로 멤버가 들어올 수 있어요.</span>
                    </div>
                    {lottieState === true ? (
                        <>
                            <div style={{ height: '80px' }}></div>
                            <Player
                                onEvent={event => {
                                    if (event === 'complete') setTimeout(() => {setLottieState(false)}, 500);
                                }}
                                autoplay
                                keepLastFrame
                                src={CheckLottie}
                                style={{
                                    width: '181px',
                                    height: '181px'
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <div style={{ height: '40px' }}></div>
                            <div
                                style={{ marginLeft: '20px',
                                        width: '98px', height: '98px', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        borderRadius: '500px', backgroundColor: '#FAFAFA',
                                        border: '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10)'
                            }}>
                                <div
                                    style={{ height: '98px', width: '98px', borderRadius: '500px',
                                            backgroundPosition: '50% 50%', backgroundSize: 'cover',
                                            backgroundImage: channelProfileImage !== undefined ? `url(${channelProfileImage})` : `url(${defaultChannelProfile})`,  
                                }}></div>
                            </div>
                            <div style={{ height: '40px' }}></div>
                            <div
                                style={{ margin: '0 20px 0 20px'
                            }}>
                                <BtnInfoDuplicate
                                    label='링크'
                                    text={`www.zenga.club/${code}`}
                                    message='링크를 누르면 생성한 채널로 들어갈 수 있어요.'
                                ></BtnInfoDuplicate>
                                <div style={{ height: '30px' }}></div>
                                <BtnInfoDuplicate
                                    label='코드'
                                    text={code}
                                    message='코드를 입력하면 생성한 채널로 들어갈 수 있어요.'
                                ></BtnInfoDuplicate>
                            </div>
                            <div style={{ height: '109px' }}></div>
                            <div
                                style={{ background: `${color.background}`, margin: '0',
                                        position: 'fixed', bottom: '0', maxWidth: '500px',
                                        width: '100%', display: 'flex', justifyContent: 'center',
                                        height: '47px', padding: '8px 0'
                            }}>
                                <div style={{ width: "calc(100% - 40px)", maxWidth: "460px" }}>
                                    <ButtonBasic
                                        innerText='확인'
                                        onClick={() => {navigate(`/${code}/praise`, {replace: true}); localStorage.setItem("memberId", `${memberId}`);}}
                                        disable={false}
                                    ></ButtonBasic>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}

            {step === 1 && (
                <>
                    <div
                        style={{ marginLeft: '20px'
                    }}>
                        <InputProfile
                            image={channelProfileImage}
                            handleProfileImageUpload={handleChannelProfileImageUpload}
                        ></InputProfile>
                    </div>
                    <div style={{ height: '40px' }}></div>
                    <div
                        style={{ margin: '0 20px 0 20px'
                    }}>
                        <InputText
                            isNecessary={true}
                            label='채널명'
                            placeholder='채널명을 입력해 주세요.'
                            value={clubname}
                            onChange={handleClubnameChange}
                        />
                    </div>
                    <div style={{ height: '281px' }}></div>
                    <div
                        style={{ margin: '0', background: `${color.background}`,
                                position: 'fixed', bottom: '0', maxWidth: '500px',
                                width: '100%', display: 'flex', justifyContent: 'center',
                                height: '47px', padding: '8px 0'
                    }}>
                        <div style={{ width: "calc(100% - 40px)", maxWidth: "460px" }}>
                            <ButtonBasic
                                innerText='다음'
                                onClick={handleNextButtonClick}
                                disable={clubname === ""}
                            ></ButtonBasic>
                        </div>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <div
                        style={{ marginLeft: '20px'
                    }}>
                        <InputProfile
                            image={adminProfileImage}
                            handleProfileImageUpload={handleAdminProfileImageUpload}
                        ></InputProfile>
                    </div>
                    <div style={{ height: '40px' }}></div>
                    <div
                        style={{ margin: '0 20px 0 20px'
                    }}>
                        <InputText
                            isNecessary={true}
                            label='방장 닉네임(본인)'
                            placeholder='닉네임을 입력해 주세요.'
                            value={nickname}
                            onChange={handleNicknameChange}
                        />
                    </div>
                    <div style={{ height: '32px' }}></div>
                    <div
                        style={{ margin: '0 20px 0 20px'
                    }}>
                        <TextField
                            label="자기소개"
                            placeholder="나를 한줄로 소개해 보세요."
                            value={intro}
                            onChange={handleIntroChange}
                            maxLength={50}
                        />
                    </div>
                    <div style={{ height: '182px' }}></div>
                    <div
                        style={{ margin: '0', background: `${color.background}`,
                                position: 'fixed', bottom: '0', maxWidth: '500px',
                                width: '100%', display: 'flex', justifyContent: 'center',
                                height: '47px', padding: '8px 0'
                    }}>
                        <div style={{ width: "calc(100% - 40px)", maxWidth: "460px" }}>
                            <ButtonBasic
                                innerText='확인'
                                onClick={handleNextButtonClick}
                                disable={nickname === ""}
                            ></ButtonBasic>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default NewChannelOnboarding