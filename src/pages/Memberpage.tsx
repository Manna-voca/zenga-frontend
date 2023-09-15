import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ProfileUpper from "../components/ProfileUpper";
import defaultChannelProfile from '../images/defaultchannelprofile.png';
import ProfileAlbum from "../components/ProfileAlbum";
import ProfileZenga from "../components/ProfileZenga";
import Navbar from "../components/Navbar";
import axios from "axios";

interface memberpageInfoProps{
    intro: string;
    name: string;
    img: string;
};

const Memberpage = () => {
    const navigate = useNavigate();
    const { memberId } = useParams();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };

    const [memberpageInfo, setMemberpageInfo] = useState<memberpageInfoProps>({intro: '', name: '', img: ''});

    const [textState, setTextState] = useState<string | null>("앨범");

    const handleAlbumTextClick = () => {
        setTextState("앨범");
    };

    const handleZengaTextClick = () => {
        setTextState("젠가");
    };

    const getMemberpageInfo = async () => {
        await axios.get(`${SERVER_URL}/members/${memberId}`, CONFIG).then((res) => {
            console.log(res.data.data);
            setMemberpageInfo({
                intro: res.data.data.introduction,
                name: res.data.data.name,
                img: res.data.data.profileImageUrl
            });
        })
    };

    useEffect(() => {
        getMemberpageInfo();
    }, []);

    return(
        <>
            <Header type="back"></Header>
            <div style={{ height: '16px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px'
            }}>
                <ProfileUpper
                    image={memberpageInfo.img}
                    name={memberpageInfo.name}
                    text={memberpageInfo.intro}
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
                    <ProfileAlbum who="member" memberId={memberId}></ProfileAlbum>
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