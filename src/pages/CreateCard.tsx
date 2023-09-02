import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ReactComponent as CameraImg } from "../images/camera.svg";
import ButtonBasic from "../components/ButtonBasic";
import MeetupMember from "./MeetupMember";

const CreateCard = () => {
    const navigate = useNavigate();

    const [cardState, setCardState] = useState<boolean>(false);
    const [memberState, setMemberState] = useState<boolean>(false);

    const handleCardMakingBtnClick = () => {
        setCardState(true);
    };

    const handleParticipantImgClick = () => {
        setPreventPopstate(true);
        setMemberState(true);
    };

    const handleConfirmBtnClick = () => {
        // 앞으로 가기 기록 안 남기기(아직 해결 못함)
        navigate(-1);
    };

    const [cardImage, setCardImage] = useState<string | ArrayBuffer | null>();
    const [cardImageFile, setCardImageFile] = useState<File | null>();

    const handleCardImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if(files.length > 0){
            setCardImageFile(files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                setCardImage(reader.result);
            };
        }
        event.target.value = "";
    };

    const [preventPopState, setPreventPopstate] = useState<boolean>(false);

    useEffect(() => {
        if(preventPopState){
            window.history.pushState(null, "", "");
            window.onpopstate = () => {
                setMemberState(false);
                setPreventPopstate(!preventPopState);
            };
        }
    }, [preventPopState]);

    return(
        <>
            {memberState ? (
                <>
                    <MeetupMember></MeetupMember>
                </>
            ) : (
                <>
                    <Header type={cardState ? "card" : "back"} text="카드 만들기" func={handleParticipantImgClick}></Header>
                    <div style={{ height: '20px' }}></div>
                    <div style={{ margin: '0 20px 0 20px' }}>
                        {cardState ? (
                            <>
                                <div
                                    style={{ height: '535px', width: '100%',
                                            borderRadius: '10px', backgroundImage: `url(${cardImage})`,
                                            backgroundPosition: '50% 50%', backgroundSize: 'cover',
                                            position: 'relative'
                                }}>
                                    <div
                                        style={{ position: 'absolute', top: '20px', left: '20px',
                                                height: '17px', lineHeight: '150%',
                                                color: 'var(--on-primary-active, #FCFCFC)',
                                                textShadow: '0px 0px 2px rgba(0, 0, 0, 0.10)',
                                                fontSize: '14px', fontStyle: 'normal',
                                                fontWeight: '400'
                                    }}>
                                        2023.02.26
                                    </div>
                                    <div
                                        style={{ position: 'absolute', bottom: '20px',
                                                margin: '0 20px 0 20px', display: 'flex',
                                                flexDirection: 'column', justifyContent: 'flex-end',
                                                gap: '4px',
                                                color: 'var(--on-primary-active, #FCFCFC)',
                                                textShadow: '0px 0px 2px rgba(0, 0, 0, 0.10)',
                                    }}>
                                        <div
                                            style={{ display: 'block', overflow: 'hidden',
                                                    textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                    fontSize: '21px', fontStyle: 'normal',
                                                    fontWeight: '600', lineHeight: '150%'
                                        }}>
                                            맞짱 뜰 사람~!
                                        </div>
                                        <div
                                            style={{ fontSize: '14px', fontStyle: 'normal',
                                                    fontWeight: '400', lineHeight: '150%',
                                                    flexBasis: '40px', width: '100%',
                                                    whiteSpace: 'pre-wrap'
                                        }}>
                                            우리 2월에 만났는데 벌써 7월이야..ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ...  더보기
                                        </div>
                                    </div>
                                </div>
                                <div style={{ height: '39px' }}></div>

                                <ButtonBasic
                                    innerText="확인"
                                    onClick={handleConfirmBtnClick}
                                    disable={false}
                                ></ButtonBasic>
                            </>
                        ) : (
                            <>
                                <div
                                    style={{ height: '535px', width: '100%',
                                            borderRadius: '10px',
                                            background: 'var(--surface-surface, #FAFAFA)',
                                            display: 'flex', justifyContent: 'center',
                                            alignItems: 'center'
                                }}>
                                    <label
                                        htmlFor="ex_file"
                                        style={{ width: '100%', height: '100%',
                                                display: 'flex', justifyContent: 'center',
                                                alignItems: 'center', cursor: 'pointer'
                                    }}>
                                        {cardImage ? (
                                            <div
                                                style={{ backgroundImage: `url(${cardImage})`, height: '100%',
                                                        width: '100%', borderRadius: '10px',
                                                        backgroundPosition: '50% 50%', backgroundSize: 'cover'
                                            }}></div>
                                        ) : (
                                            <div
                                                style={{ 
                                                        display: 'flex', flexDirection: 'column',
                                                        gap: '20px', alignItems: 'center'
                                            }}>
                                                <CameraImg width={52} height={52}/>
                                                <div
                                                    style={{ display: 'flex', flexDirection: 'column',
                                                            gap: '4px', alignItems: 'center',
                                                            color: 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))',
                                                }}>
                                                    <div
                                                        style={{ textAlign: 'center', fontSize: '21px',
                                                                fontStyle: 'normal', fontWeight: '600',
                                                                lineHeight: '150%'
                                                    }}>
                                                        모임 사진 업로드
                                                    </div>
                                                    <div
                                                        style={{ textAlign: 'center', fontSize: '14px',
                                                                fontStyle: 'normal', fontWeight: '400',
                                                                lineHeight: '150%'
                                                    }}>
                                                        모임 카드를 만든 이후에는<br></br>사진을 변경할 수 없어요
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <input
                                            style={{ width: '0', height: '0' }}
                                            type="file"
                                            id='ex_file'
                                            name="cardImage"
                                            accept="image/*"
                                            onChange={handleCardImageUpload}
                                        />
                                    </label>
                                </div>
                                <div style={{ height: '39px' }}></div>
                                <ButtonBasic
                                    innerText="카드 만들기 완료"
                                    onClick={handleCardMakingBtnClick}
                                    disable={cardImage === undefined}
                                ></ButtonBasic>
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default CreateCard;