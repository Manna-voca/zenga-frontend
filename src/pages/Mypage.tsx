import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CircularImage from "../components/CircularImage";
import defaultChannelProfile from '../images/defaultchannelprofile.png';
import ButtonBasic from "../components/ButtonBasic";
import ProfileUpper from "../components/ProfileUpper";
import Navbar from "../components/Navbar";
import ProfileAlbum from "../components/ProfileAlbum";
import ProfileZenga from "../components/ProfileZenga";
import ProfileMeetup from "../components/ProfileMeetup";

const Mypage = () => {
    const navigate = useNavigate();

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

    return(
        <>
            <Header type="my"></Header>
            <div style={{ height: '16px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px'
            }}>
                <ProfileUpper
                    image={defaultChannelProfile}
                    name="박세원"
                    text="자기소개 내용이 들어갈 부분입니다 자기소개 내용이 들어갈 부분입니다 자기소개 내용이 들어갈"
                ></ProfileUpper>
                <div style={{ height: '20px' }}></div>
                <ButtonBasic
                    innerText="프로필 수정"
                    onClick={() => navigate('/modify-profile-info')}
                    btnColor='FAFAFA'
                />
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
                    <ProfileAlbum who="my"></ProfileAlbum>
                </>
            ) : (
                textState === "젠가" ? (
                    <>
                        <ProfileZenga></ProfileZenga>
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