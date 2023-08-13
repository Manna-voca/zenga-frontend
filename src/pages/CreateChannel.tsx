import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ReactComponent as WhaleImg } from "../images/subtract.svg";
import ButtonBasic from "../components/ButtonBasic";

const CreateChannel = () => {
    const navigate = useNavigate();

    // 채널 유형에 따른 상태
    const [isNew, setIsNew] = useState<boolean>();

    let checkBtnDisable = true;

    const handleCreateNewChannel = () => {
        if(isNew !== true){
            setIsNew(true);
        }
    };

    const handleEnterChannel = () => {
        if(isNew !== false){
            setIsNew(false);
        }
    };

    const handleConfirmButtonClick = () => {
        if(isNew === true){
            navigate('/createchannel/newonboarding');
        }
        else if(isNew === false){
            navigate('/createchannel/oldonboarding');
        }
         
    };

    return(
        <>
            <Header type='back' ></Header>
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
                        border: isNew === true ? '1px solid var(--surface-outline, #1F94FF' : '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10))',
                        backgroundColor: isNew === true ? '#E3F2FF' : '#FAFAFA', 
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
                        border: isNew === false ? '1px solid var(--surface-outline, #FEC33E' : '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10)',
                        backgroundColor: isNew === false ? '#FFF8E4' : '#FAFAFA',
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
                style={{ margin: '0 20px 0 20px'
            }}>
                <ButtonBasic
                innerText="확인"
                onClick={handleConfirmButtonClick}
                disable={isNew === undefined}
                ></ButtonBasic>
            </div>
        </>
    );
}

export default CreateChannel;