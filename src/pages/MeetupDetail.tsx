import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CircularImage from "../components/CircularImage";
import testUserImg from '../images/channelprofile.png';
import testImg from '../images/jun.png';
import { ReactComponent as ClockImg } from "../images/clock.svg";
import { ReactComponent as LocationImg } from "../images/location.svg";
import { ReactComponent as ArrowImg } from "../images/arrow.svg";
import { ReactComponent as PeopleImg } from "../images/people.svg"
import { ReactComponent as CommentImg } from "../images/comment.svg"
import BtnProfileThumbnail from "../components/BtnProfileThumbnail";
import ButtonBasic from "../components/ButtonBasic";
import { color } from "../styles/color";
import ButtonMultiple from "../components/ButtonMultiple";
import PopupComplaint from "../components/PopupComplaint";
import Popup2 from "../components/Popup2";
import Popup1 from "../components/Popup1";

const MeetupDetail = () => {
    const navigate = useNavigate();

    const [isMeetupMaker, setIsMeetupMaker] = useState<boolean>(true);
    const [kebabState, setKebabState] = useState<boolean>(false);
    const [showComplaint, setShowComplaint] = useState<boolean>(false);
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
    const [showMeetupPopup, setShowMeetupPopup] = useState<boolean>(false);
    const [showMeetupCancelPopup, setShowMeetupCancelPopup] = useState<boolean>(false);
    const [showMeetupCompletePopup, setShowMeetupCompletePopup] = useState<boolean>(false);

    // 1 - 모임 참여하기 / 2- 모임 참여 취소하기 / 3 - 모임 진행 중 / 4 - 모임 완료 / 5 - 모집 완료 / 6 - 카드 만들기
    const [buttonState, setButtonState] = useState<number>(5);

    const handleKebabClick = () => {
        setKebabState(true);
    };

    const handleMemberButtonClick = () => {
        navigate('/meetup-member/1');
    };

    const handleMeetupDeleteBtnClick = () => {
        setShowDeletePopup(false);
    };

    const handleMeetupParticipateBtnClick = () => {
        setButtonState(2);
        setShowMeetupPopup(false);
    };

    const handleMeetupCancelBtnClick = () => {
        setButtonState(1);
        setShowMeetupCancelPopup(false);
    };

    const handleMeetupCompleteBtnClick = () => {
        setButtonState(6);
        setShowMeetupCompletePopup(false);
    };

    const handleButtonClick = () => {
        if(buttonState === 1){
            setShowMeetupPopup(true);
        }
        else if(buttonState === 2){
            setShowMeetupCancelPopup(true);
        }
        else if(buttonState === 5){
            setShowMeetupCompletePopup(true);
        }
        else if(buttonState === 6){
            navigate('/create-card/1');
        }
    };

    const buttonData = ["", "모임 참여하기", "모임 참여 취소하기", "모임 진행 중", "모임 완료", "모집 완료", "카드 만들기"];

    return(
        <>
            <Header type="detail" func={handleKebabClick}></Header>
            <div style={{ height: '12px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px', display: 'flex',
                        alignItems: 'center', justifyContent: 'space-between',
                        color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
            }}>
                <div
                    onClick={() => navigate('/memberpage/1')}
                    style={{ display: 'flex', alignItems: 'center',
                            gap: '6px', cursor: 'pointer'
                }}>
                    <CircularImage
                        image={testUserImg}
                        size="24"
                    />
                    <div
                        style={{ fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '500'
                    }}>
                        모아이
                    </div>
                </div>
                <div
                    style={{ fontSize: '12px', fontStyle: 'normal',
                            fontWeight: '400'
                }}>
                    2시간 전
                </div>
            </div>
            <div style={{ height: '28px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px', 
                        height: '20px', display: 'block',
                        alignItems: 'center', overflow: 'hidden',
                        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        color: 'var(--text-text-active, var(--light-text-text-active, #0D0D0D))',
                        fontSize: '21px', fontStyle: 'normal',
                        fontWeight: '600'
            }}>
                비오니까 파전에 막걸리
            </div>
            <div style={{ height: '18px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px', display: 'flex',
                        flexDirection: 'column'
            }}>
                <p
                    style={{ color: '#0A0A0A', fontSize: '16px',
                            fontStyle: 'normal', fontWeight: '400',
                            lineHeight: '150%', flexBasis: '24px',
                            width: '100%', whiteSpace: 'pre-wrap'
                }}>
                    아 지금 시간이 새벽 1시 25분인데 이걸 하고 있다니 진짜 말도안돼 이것만 쓰고 바로 유튜브 보러 간다 파전에 막걸리 맛있겠다 계곡가서 백숙도 먹고싶다 근데 사실 집에서 부추전도 먹고 김치볶음밥도 먹고 닭발도 먹고 코다리도 먹고 빵도 먹었음 아무래도 내일부터는 아니 다음 주에는 진짜 다이어트 해야징~
                </p>
            </div>
            <div style={{ height: '28px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px'
            }}>
                <div
                    style={{ width: '100%', paddingBottom: '100%',
                            backgroundImage: `url(${testImg})`,
                            borderRadius: '8px', backgroundSize: 'cover',
                            backgroundPosition: '50% 50%'
                }}></div>
            </div>
            <div style={{ height: '28px' }}></div>
            <div
                style={{ background: 'var(--surface-divider, #D9D9D9)',
                        height: '8px', width: '100%'
            }}></div>
            <div style={{ height: '28px' }}></div>
            <div
                style={{ height: '20px', fontSize: '18px',
                        fontStyle: 'normal', fontWeight: '500',
                        marginLeft: '20px'
            }}>
                모임 정보
            </div>
            <div style={{ height: '12px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px', height: '48px',
                        background: 'var(--surface-surface, #FAFAFA)',
                        borderRadius: '8px', display: 'flex',
                        flexDirection: 'column', padding: '12px 16px',
                        alignItems: 'flex-start', gap: '12px',
                        color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
            }}>
                <div
                    style={{ display: 'flex', gap: '20px'
                }}>
                    <div
                        style={{ display: 'flex', gap: '8px'
                    }}>
                        <ClockImg width={18} height={18} fillOpacity={0.7}/>
                        <div
                            style={{ fontSize: '14px', fontStyle: 'normal',
                                    fontWeight: '600'
                        }}>
                            일시
                        </div>
                    </div>
                    <div
                        style={{ fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '400'
                    }}>
                        7월 13일(목) 20:00
                    </div>
                </div>
                <div
                    style={{ display: 'flex', gap: '20px'
                }}>
                    <div
                        style={{ display: 'flex', gap: '8px'
                    }}>
                        <LocationImg width={18} height={18} fillOpacity={0.7}/>
                        <div
                            style={{ fontSize: '14px', fontStyle: 'normal',
                                    fontWeight: '600'
                        }}>
                            장소
                        </div>
                    </div>
                    <div
                        style={{ fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '400'
                    }}>
                        우이락
                    </div>
                </div>
            </div>
            <div style={{ height: '26px' }}></div>
            <div
                style={{ height: '24px', display: 'flex',
                        margin: '0 20px 0 20px',
                        alignItems: 'center', justifyContent: 'space-between'
            }}>
                <div
                    style={{ height: '20px', fontSize: '18px',
                            fontStyle: 'normal', fontWeight: '500'
                }}>
                    멤버
                </div>
                <ArrowImg
                    onClick={handleMemberButtonClick}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div style={{ height: '10px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px', padding: '12px 16px',
                        height: '94px', borderRadius: '8px',
                        background: 'var(--surface-surface, #FAFAFA)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'flex-start', gap: '20px'
            }}>
                <div
                    style={{ display: 'flex', gap: '20px',
                            color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
                }}>
                    <div
                        style={{ display: 'flex', gap: '8px'
                    }}>
                        <PeopleImg width={18} height={18} fillOpacity={0.7}/>
                        <div
                            style={{ fontSize: '14px', fontStyle: 'normal',
                                    fontWeight: '600'
                        }}>
                            인원
                        </div>
                    </div>
                    <div
                        style={{ fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '400'
                    }}>
                        1/4
                    </div>
                </div>
                <div
                    style={{ display: 'flex', alignItems: 'flex-start',
                            gap: '16px'
                }}>
                    <BtnProfileThumbnail
                        userImg={testUserImg}
                        userName="모아이"
                        isChannelAdmin={true}
                    />
                    <BtnProfileThumbnail
                        userImg={testUserImg}
                        userName="모아이모"
                    />
                    <BtnProfileThumbnail
                        userImg={testUserImg}
                        userName="모아이모아"
                    />
                    <BtnProfileThumbnail
                        userImg={testUserImg}
                        userName="모아이모아이"
                    />
                    <BtnProfileThumbnail
                        userImg={testUserImg}
                        userName="모아이"
                    />
                    <BtnProfileThumbnail
                        userImg={testUserImg}
                        userName="모아이"
                    />
                </div>
            </div>
            <div style={{ height: '26px' }}></div>
            <div
                style={{ height: '24px', display: 'flex',
                        margin: '0 20px 0 20px',
                        alignItems: 'center', justifyContent: 'space-between'
            }}>
                <div
                    style={{ height: '20px', fontSize: '18px',
                            fontStyle: 'normal', fontWeight: '500'
                }}>
                    댓글
                </div>
                <ArrowImg
                    onClick={() => navigate('/comment/1')}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div style={{ height: '10px' }}></div>
            <div
                onClick={() => navigate('/comment/1')}
                style={{ margin: '0 20px 0 20px', padding: '12px 16px',
                        height: '62px', borderRadius: '8px',
                        background: 'var(--surface-surface, #FAFAFA)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'flex-start', gap: '20px', cursor: "pointer"
            }}>
                <div
                    style={{ display: 'flex', gap: '20px',
                            color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
                }}>
                    <div
                        style={{ display: 'flex', gap: '8px'
                    }}>
                        <CommentImg/>
                        <div
                            style={{ fontSize: '14px', fontStyle: 'normal',
                                    fontWeight: '600'
                        }}>
                            댓글 수
                        </div>
                    </div>
                    <div
                        style={{ fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '400'
                    }}>
                        0
                    </div>
                </div>
                {/* <div
                    style={{ width: '100%', height: '100%',
                            color: 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))',
                            fontSize: '14px', fontStyle: 'normal',
                            fontWeight: '400', textAlign: 'center',
                            lineHeight: '150%'
                }}>
                    아직 댓글이 달리지 않았어요
                </div> */}
                <div
                    style={{ display: 'flex', alignItems: 'center',
                            gap: '6px', fontSize: '14px', fontStyle: 'normal',
                            lineHeight: '150%', width: '100%',
                            color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
                }}>
                    <CircularImage
                        size="24"
                        image={testUserImg}
                    />
                    <div
                        style={{ fontWeight: '500', width: '45px',
                                display: 'block', alignItems: 'center',
                                overflow: 'hidden', textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                    }}>
                        모아이
                    </div>
                    <div
                        style={{ fontWeight: '400', minWidth: '0', flex: '1',
                                display: 'block', alignItems: 'center',
                                overflow: 'hidden', textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                    }}>
                        진짜 지금 역대급 배고파서 어지러워
                    </div>
                </div>
            </div>
            <div style={{ height: '103px' }}></div>
            <div
                style={{
                margin: "0",
                bottom: "0",
                position: "fixed",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                maxWidth: "500px",
                height: '47px',
                padding: "8px 0",
                boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.10)",
                background: `${color.background}`,
                }}
            >
                <div style={{ width: "calc(100% - 40px)", maxWidth: "460px" }}>
                    <ButtonBasic
                        innerText={buttonData[buttonState]}
                        onClick={handleButtonClick}
                        disable= {buttonState === 3 || buttonState === 4 ? true : buttonState === 1 || buttonState === 5 ? false : undefined}
                        btnColor={buttonState === 2 || buttonState === 6 ? "#FDB639" : undefined}
                    />
                </div>
            </div>


            {/* kebab */}
            {kebabState && (
                (isMeetupMaker ? (
                    <>
                        <ButtonMultiple
                            closeHandler={() => setKebabState(false)}
                            textList={["모임 내용 수정", "모임 삭제", "취소"]}
                            onClickList={[
                                () => {
                                    setKebabState(false);
                                    navigate('/edit-meetup/1');
                                },
                                () => {
                                    setKebabState(false);
                                    setShowDeletePopup(true);
                                },
                                () => setKebabState(false)
                            ]}
                        />
                    </>
                ) : (
                    <>
                        <ButtonMultiple
                            closeHandler={() => setKebabState(false)}
                            textList={["게시물 신고", "취소"]}
                            onClickList={[
                                () => {
                                    setKebabState(false);
                                    setShowComplaint(true);
                                },
                                () => setKebabState(false)
                            ]}
                        />
                    </>
                ))
            )}


            {/* 모달 창 */}
            {showComplaint && <PopupComplaint func={() => setShowComplaint(false)} />}
            {showDeletePopup &&
                <Popup2
                    title="모임을 삭제하시나요?"
                    text={"모임을 삭제한 이후에는\n다시 복구할 수 없어요"}
                    leftBtnText="취소"
                    rightBtnText="확인"
                    leftFunc={() => setShowDeletePopup(false)}
                    rightFunc={() => handleMeetupDeleteBtnClick()}
                />
            }
            {showMeetupPopup &&
                <Popup1
                    title="알림"
                    text={"모임 신청이 완료되었어요!\n방장이 모집 완료를 하기 전까지\n잠시만 기다려주세요"}
                    btnText="확인"
                    func={() => handleMeetupParticipateBtnClick()}
                />
                
            }
            {showMeetupCancelPopup &&
                <Popup2
                    title="모임 참여를 취소하시나요?"
                    text={"참여를 취소해도 모임이 모집 중이라면\n다시 참여 할 수 있어요"}
                    leftBtnText="취소"
                    rightBtnText="확인"
                    leftFunc={() => setShowMeetupCancelPopup(false)}
                    rightFunc={() => handleMeetupCancelBtnClick()}
                />
            }
            {showMeetupCompletePopup &&
                <Popup2
                    title="모임 모집을 완료하시나요?"
                    text={"모집을 완료한 이후에는\n추가로 멤버를 모집할 수 없어요"}
                    leftBtnText="취소"
                    rightBtnText="확인"
                    leftFunc={() => setShowMeetupCompletePopup(false)}
                    rightFunc={() => handleMeetupCompleteBtnClick()}
                />
            }
        </>
    );
}

export default MeetupDetail;