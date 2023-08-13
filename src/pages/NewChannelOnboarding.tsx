import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { ReactComponent as CameraImg } from "../images/camera.svg";

// 기존 뒤로가기 기능과 상단의 버튼을 통해 뒤로가기에 대해 이전 단계로 돌아가도록 추후 구현

const NewChannelOnboarding = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState<number>(1);

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
                    <div style={{ height: '103px' }}>
                        링크 - 석민이형의 inputText 변형 후 추가 예정
                    </div>
                    <div style={{ height: '30px' }}></div>
                    <div style={{ height: '103px' }}>
                        코드 - 석민이형의 inputText 변형 후 추가 예정2
                    </div>
                    <div style={{ height: '109px' }}></div>
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
                    <div style={{ height: '69px' }}>
                        동아리명 - 석민이형 inputText
                    </div>
                    <div style={{ height: '281px' }}></div>
                </>
            )}

            {step === 2 && (
                <>
                    <div style={{ height: '69px' }}>
                        방장 닉네임 - 석민이형 inputText
                    </div>
                    <div style={{ height: '32px' }}></div>
                    <div style={{ height: '205px' }}>
                        한줄 소개 - 석민이형 textArea
                    </div>
                    <div style={{ height: '182px' }}></div>
                </>
            )}

            <div
                onClick={handleNextButtonClick}
                style={{ margin: '0 20px 0 20px'
            }}>
                석민이형 버튼
            </div>

            
            
        </>
    );
}

export default NewChannelOnboarding