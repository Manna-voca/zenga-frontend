import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { ReactComponent as CameraImg } from "../images/camera.svg";
import InputText from '../components/InputText';
import ButtonBasic from '../components/ButtonBasic';
import TextField from '../components/TextField';
import BtnInfoDuplicate from '../components/BtnInfoDuplicate';

// 기존 뒤로가기 기능과 상단의 버튼을 통해 뒤로가기에 대해 이전 단계로 돌아가도록 추후 구현

const NewChannelOnboarding = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState<number>(1);
    const [clubname, setClubname] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [intro, setIntro] = useState<string>("");
    const handleClubnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClubname(event.target.value);
    };
    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };
    const handleIntroChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIntro(event.target.value);
    };

    const handleNextButtonClick = () => {
        console.log(step);
        setStep((current) => (current) + 1);
        if(step === 3){
            navigate('/home');
        }
    };

    return(
        <>
            {step === 1 || step === 2 ? (
                <Header type='back' link = {'/createchannel'}></Header>
            ) : (
                <Header></Header>
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
                        <span>{step === 1 ? '동아리 정보를' : '방장의 정보를'}<br></br>입력해 주세요</span>
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
                        <span>2가지 방법으로 동아리원이 들어올 수 있어요.</span>
                    </div>
                    <div style={{ height: '40px' }}></div>
                    <div
                        style={{ marginLeft: '20px', cursor: 'pointer',
                                width: '98px', height: '98px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                borderRadius: '500px', backgroundColor: '#FAFAFA',
                                border: '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10)'
                    }}>
                        <CameraImg />
                    </div>
                    <div style={{ height: '40px' }}></div>
                    <div
                        style={{ margin: '0 20px 0 20px'
                    }}>
                        <BtnInfoDuplicate
                            label='링크'
                            text='www.zenga/kusitms4834'
                            message='링크를 누르면 생성한 채널로 들어갈 수 있어요.'
                        ></BtnInfoDuplicate>
                        <div style={{ height: '30px' }}></div>
                        <BtnInfoDuplicate
                            label='코드'
                            text='ad3f78e1'
                            message='코드를 입력하면 생성한 채널로 들어갈 수 있어요.'
                        ></BtnInfoDuplicate>
                    </div>
                    <div style={{ height: '109px' }}></div>
                    <div
                        style={{ margin: '0 20px 0 20px'
                    }}>
                        <ButtonBasic
                            innerText='확인'
                            onClick={() => navigate('/home')}
                            disable={false}
                        ></ButtonBasic>
                    </div>
                </>
            )}

            {step === 1 && (
                <>
                    <div
                        style={{ marginLeft: '20px', cursor: 'pointer',
                                width: '98px', height: '98px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                borderRadius: '500px', backgroundColor: '#FAFAFA',
                                border: '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10)'
                    }}>
                        <CameraImg />
                    </div>
                    <div style={{ height: '40px' }}></div>
                    <div
                        style={{ margin: '0 20px 0 20px'
                    }}>
                        <InputText
                            isNecessary={true}
                            label='동아리명'
                            placeholder='이름을 입력해 주세요.'
                            value={clubname}
                            onChange={handleClubnameChange}
                        />
                    </div>
                    <div style={{ height: '281px' }}></div>
                    <div
                        style={{ margin: '0 20px 0 20px'
                    }}>
                        <ButtonBasic
                            innerText='다음'
                            onClick={handleNextButtonClick}
                            disable={clubname === ""}
                        ></ButtonBasic>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
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
                            label="한줄 소개"
                            placeholder="나를 한줄로 소개해 보세요."
                            value={intro}
                            onChange={handleIntroChange}
                            maxLength={100}
                        />
                    </div>
                    <div style={{ height: '182px' }}></div>
                    <div
                        style={{ margin: '0 20px 0 20px'
                    }}>
                        <ButtonBasic
                            innerText='확인'
                            onClick={handleNextButtonClick}
                            disable={nickname === ""}
                        ></ButtonBasic>
                    </div>
                </>
            )}
        </>
    );
}

export default NewChannelOnboarding