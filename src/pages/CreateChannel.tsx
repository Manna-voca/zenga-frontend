import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ReactComponent as WhaleImg } from "../images/subtract.svg";

const CreateChannel = () => {
    const navigate = useNavigate();

    // 채널 유형에 따라 새 채널이면 1, 기존 채널이면 2
    const [check, setCheck] = useState<number>(0);

    const handleCreateNewChannel = () => {
        if(check === 1){
            setCheck(0);
        }
        else{
            setCheck(1);
        }
    };

    const handleEnterChannel = () => {
        if(check === 2){
            setCheck(0);
        }
        else{
            setCheck(2);
        }
    };

    const handleConfirmButtonClick = () => {
        if(check === 1){
            navigate('/createchannel/newonboarding');
        }
        else if(check === 2){
            navigate('/createchannel/oldonboarding');
        }
         
    };

    return(
        <>
            <Header type='back' link = {'/'} ></Header>
            <div style={{ height: '16px' }}></div>
            <div
                style={{ width: '274px', height: '59px',
                        lineHeight: '150%', marginLeft: '20px',
                        fontSize: '24px', fontStyle: 'normal',
                        fontWeight: '600',
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'center', flexShrink: '0'
            }}>
                <span>생성할 채널의 유형을<br></br>선택해 주세요</span>
            </div>
            <div style={{ height: '60px' }}></div>
            <div
                onClick={handleCreateNewChannel}
                style={{ margin: '0 20px 0 20px', borderRadius: '8px',
                        height: '100px', cursor: 'pointer',
                        border: check === 1 ? '1px solid var(--surface-outline, #1F94FF' : '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10))',
                        backgroundColor: check === 1 ? '#E3F2FF' : '#FAFAFA', 
                        display: 'flex', alignItems: 'center'
            }}>
                <div style={{ marginLeft: '24px' }}>
                    <WhaleImg fill="#8FC9FF"/>
                </div>
                <div
                    style={{ marginLeft: '15.62px', fontSize: '18px',
                            fontStyle: 'normal', fontWeight: '500'
                }}>
                    <span>채널 새롭게 생성하기</span>
                </div>
            </div>
            <div style={{ height: '20px' }}></div>
            <div
                onClick={handleEnterChannel}
                style={{ margin: '0 20px 0 20px', borderRadius: '8px',
                        height: '100px', cursor: 'pointer',
                        border: check === 2 ? '1px solid var(--surface-outline, #1F94FF' : '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10)',
                        backgroundColor: check === 2 ? '#E3F2FF' : '#FAFAFA',
                        display: 'flex', alignItems: 'center'
            }}>
                <div style={{ marginLeft: '24px' }}>
                    <WhaleImg fill="#FFE18E"/>
                </div>
                <div
                    style={{ marginLeft: '15.62px', fontSize: '18px',
                            fontStyle: 'normal', fontWeight: '500'
                }}>
                    <span>만들어진 채널에 입장하기</span>
                </div>
            </div>
            <div style={{ height: '248px' }}></div>
            <div
                onClick={handleConfirmButtonClick} 
                style={{ margin: '0 20px 0 20px'
            }}>
                석민이형 버튼
            </div>
        </>
    );
}

export default CreateChannel;