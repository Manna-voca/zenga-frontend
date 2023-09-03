import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProfileUpper from "../components/ProfileUpper";
import defaultChannelProfile from '../images/defaultchannelprofile.png';
import ProfileAlbum from "../components/ProfileAlbum";
import ProfileZenga from "../components/ProfileZenga";
import Navbar from "../components/Navbar";

const Memberpage = () => {
    const navigate = useNavigate();

    const [textState, setTextState] = useState<string | null>("앨범");

    const handleAlbumTextClick = () => {
        setTextState("앨범");
    };

    const handleZengaTextClick = () => {
        setTextState("젠가");
    };

    return(
        <>
            <Header type="back"></Header>
            <div style={{ height: '16px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px'
            }}>
                <ProfileUpper
                    image={defaultChannelProfile}
                    name="박세원"
                    text="자기소개 내용이 들어갈 부분입니다 자기소개 내용이 들어갈 부분입니다 자기소개 내용이 들어갈"
                ></ProfileUpper>
            </div>
            <div style={{ height: '50px' }}></div>
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
            </div>
            {textState === "앨범" ? (
                <>
                    <ProfileAlbum who="member"></ProfileAlbum>
                </>
            ) : (
                <>
                    <ProfileZenga></ProfileZenga>
                </>
            )}
            <div style={{ height: '57px' }}></div>
            <Navbar state={0}></Navbar>
        </>
    );
}

export default Memberpage;