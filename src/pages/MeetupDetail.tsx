import React from "react";
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

const MeetupDetail = () => {
    const navigate = useNavigate();

    const handleMemberButtonClick = () => {
        navigate('/meetup-member/1');
    };

    return(
        <>
            <Header type="detail"></Header>
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
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div style={{ height: '10px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px', padding: '12px 16px',
                        height: '62px', borderRadius: '8px',
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
                        innerText="모임 참여하기"
                        onClick={() => navigate('/create-card/1')}
                        disable={false}
                    />
                </div>
            </div>
        </>
    );
}

export default MeetupDetail;