import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { ReactComponent as CameraImg } from "../images/camera.svg";
import InputText from '../components/InputText';
import ButtonBasic from '../components/ButtonBasic';
import TextField from '../components/TextField';

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

    const handleButtonClick = () => {
        console.log(step);
        setStep((current) => (current) + 1);
        if(step === 3){
            navigate('/home');
        }
    };

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
                        style={{ width: '350px', height: '59px',
                                lineHeight: '150%', marginLeft: '20px',
                                fontSize: '24px', fontStyle: 'normal',
                                fontWeight: '600',
                                display: 'flex', flexDirection: 'column',
                                justifyContent: 'center', flexShrink: '0'
                    }}>
                        <span>{step === 1 ? '초대받은 채널의' : '동아리에서 사용할 정보를'}
                            <br></br>{step === 1 ? '코드를 입력해 주세요' : '입력해 주세요'}
                        </span>
                    </div>
                    <div style={{ height: step === 1 ? '60px' : '40px' }}></div>
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
                    <div>채널 생성 lottie</div>
                </>
            )}

            {step === 1 && (
                <>
                    <div
                        style={{ margin: '0 20px 0 20px'
                    }}>
                        <InputText
                            isNecessary={false}
                            label='코드'
                            placeholder='8자리 코드를 입력해 주세요'
                            value={code}
                            onChange={handleCodeChange}
                        />
                        <div style={{ height: '399px' }}></div>
                        <ButtonBasic
                            innerText='채널 입장하기'
                            onClick={handleButtonClick}
                            disable={code === ""}
                        ></ButtonBasic>
                    </div>
                </>
            )}

            {step === 2 && (
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
                            label='닉네임'
                            placeholder='닉네임을 입력해 주세요.'
                            value={nickname}
                            onChange={handleNicknameChange}
                        />
                        <div style={{ height: '32px' }}></div>
                        <TextField
                            label='한줄 소개'
                            placeholder='나를 한줄로 소개해 보세요.'
                            value={intro}
                            onChange={handleIntroChange}
                            maxLength={100}
                        />
                        <div style={{ height: '44px' }}></div>
                        <ButtonBasic
                            innerText='확인'
                            onClick={handleButtonClick}
                            disable={nickname === ""}
                        ></ButtonBasic>
                    </div>
                </>
            )}
        </>
    );
}

export default OldChannelOnboarding