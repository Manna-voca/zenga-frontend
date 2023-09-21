import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import defaultChannelProfile from '../images/defaultchannelprofile.png';
import ProfileUpper from "../components/ProfileUpper";
import Navbar from "../components/Navbar";
import ProfileAlbum from "../components/ProfileAlbum";
import ProfileZenga from "../components/ProfileZenga";
import ProfileMeetup from "../components/ProfileMeetup";
import axios from "axios";

interface mypageInfoProps{
    intro: string;
    name: string;
    img: string;
};

const Mypage = () => {
    const navigate = useNavigate();
    const CHANNEL_ID = localStorage.getItem("channelId");
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };

    const [mypageInfo, setMypageInfo] = useState<mypageInfoProps>({intro: '', name: '', img: ''});

    const [textState, setTextState] = useState<string | null>("앨범");

    const [local, setLocal] = useState(() => {
        if(localStorage.getItem("mypage")){
            setTextState(localStorage.getItem("mypage"));
        }
    });

    const handleAlbumTextClick = () => {
        setTextState("앨범");
        localStorage.setItem("mypage", "앨범");
    };

    const handleZengaTextClick = () => {
        setTextState("젠가");
        localStorage.setItem("mypage", "젠가");
    };

    const handleMeetupTextClick = () => {
        setTextState("모임");
        localStorage.setItem("mypage", "모임");
    };

    const getMypageInfo = async () => {
        await axios.get(`${SERVER_URL}/members/info?channelId=${CHANNEL_ID}`, CONFIG).then((res) => {
            setMypageInfo({
                intro: res.data.data.introduction,
                name: res.data.data.name,
                img: res.data.data.profileImageUrl
            });
        })
    };

    useEffect(() => {
        getMypageInfo();
    }, []);


    return(
        <>
            <Header type="my"></Header>
            <div style={{ height: '16px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px'
            }}>
                <ProfileUpper
                    image={mypageInfo.img}
                    name={mypageInfo.name}
                    text={mypageInfo.intro}
                ></ProfileUpper>
                <div style={{ height: '20px' }}></div>
                <button
                    onClick={() => navigate('/modify-profile-info')}
                    style={{ width: '100%', height: '36px', display: 'flex',
                            padding: '12px 117px 11px 117px', justifyContent: 'center',
                            alignItems: 'center', borderRadius: '8px',
                            border: 'none', boxSizing: 'border-box',
                            background: 'var(--surface-surface, #FAFAFA)',
                            color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))',
                            fontSize: '14px', fontStyle: 'normal',
                            fontWeight: '500', lineHeight: '150%',
                            fontFamily: 'Pretendard'
                    }}
                >
                    프로필 수정
                </button>
            </div>
            <div style={{ height: '28px' }}></div>
            <div
                style={{ display: 'flex', height: '29px',
                        fontSize: '14px', fontStyle: 'normal',
                        fontWeight: '600', lineHeight: '150%',
                        alignItems: 'flex-start'
            }}>
                <div
                    onClick={handleAlbumTextClick}
                    style={{ display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: '6px', flex: '1',
                            cursor: 'pointer'
                }}>
                    <div
                        style={{ color : textState === "앨범" ? 'var(--primary-primary-500, #1F94FF)' : 'var(--surface-divider, #D9D9D9)'
                    }}>
                        앨범
                    </div>
                    <div
                        style={{ background: textState === "앨범" ? 'var(--primary-primary-500, #1F94FF)' : 'var(--surface-divider, #D9D9D9)',
                                width: '100%', height: '2px'
                    }}></div>
                </div>
                <div
                    onClick={handleZengaTextClick}
                    style={{ display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: '6px', flex: '1',
                            cursor: 'pointer'
                }}>
                    <div
                        style={{ color: textState === "젠가" ? 'var(--primary-primary-500, #1F94FF)' : 'var(--surface-divider, #D9D9D9)'
                    }}>
                        젠가
                    </div>
                    <div
                        style={{ background: textState === "젠가" ? 'var(--primary-primary-500, #1F94FF)' : 'var(--surface-divider, #D9D9D9)',
                                width: '100%', height: '2px'
                    }}></div>
                </div>
                <div
                    onClick={handleMeetupTextClick}
                    style={{ display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: '6px', flex: '1',
                            cursor: 'pointer'
                }}>
                    <div
                        style={{ color: textState === "모임" ? 'var(--primary-primary-500, #1F94FF)' : 'var(--surface-divider, #D9D9D9)'
                    }}>
                        모임
                    </div>
                    <div
                        style={{ background: textState === "모임" ? 'var(--primary-primary-500, #1F94FF)' : 'var(--surface-divider, #D9D9D9)',
                                width: '100%', height: '2px'
                    }}></div>
                </div>
            </div>
            {textState === "앨범" ? (
                <>
                    <ProfileAlbum who="my" memberId={localStorage.getItem("memberId")}></ProfileAlbum>
                </>
            ) : (
                textState === "젠가" ? (
                    <>
                        <ProfileZenga memberId={localStorage.getItem("memberId")}></ProfileZenga>
                    </>
                ) : (
                    <>
                        <ProfileMeetup></ProfileMeetup>
                    </>
                )
            )}
            <div style={{ height: '57px' }}></div>
            <Navbar state={4}></Navbar>
        </>
    );
}

export default Mypage;