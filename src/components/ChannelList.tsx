import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as PlusImg } from "../images/plus.svg";
import channelprofileImg from "../images/channelprofile.png";

// 나중에 필요한 요소 더 추가할 예정
interface Props {
    type? : string; // new || channel
    name? : string;
    img? : string;
    code?: string;
    memberId?: number;
};

const ChannelList = ({type = 'channel', name, img, code, memberId}: Props) => {
    const navigate = useNavigate();
    const { channelCode } = useParams();

    const handleClick = async () => {
      localStorage.removeItem('praise');
        if(type === 'new'){
            document.body.style.overflow = "unset";
            navigate('/create-channel');
        }
        else if(type === 'channel'){
            document.body.style.overflow = "unset";
            try{
                localStorage.setItem("memberId", `${memberId}`);
                window.location.replace(`/${code}/praise`);
            } catch(err){
                console.error(err);
            }
            
        }
    };

    return(
        <>
            <div
                onClick={code === channelCode ? undefined :handleClick}
                style={{ width: '260px', height: '36px',
                        padding: '12px 20px 12px 20px', display: 'flex',
                        alignItems: 'center', cursor: code === channelCode ? '' : 'pointer',
                        borderBottom: '0.5px solid var(--surface-outline, rgba(10, 10, 10, 0.10))',
                        background: code === channelCode ? 'var(--primary-primary-50, #E3F2FF)' : ''
            }}>
                {type === 'new' && (
                    <>
                        <div style={{height: '36px', width: '36px',
                                    borderRadius: '184px', justifyContent: 'center',
                                    display: 'flex', alignItems: 'center',
                                    background: 'var(--primary-primary-50, #E3F2FF)',
                        }}>
                            <PlusImg />
                        </div>
                        <div
                            style={{ marginLeft: '12px', fontSize: '16px',
                                    fontStyle: 'normal', fontWeight: '400',
                                    lineHeight: '150%', justifyContent: 'center',
                                    display: 'flex', alignItems: 'center',
                                    color: 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))'

                        }}>
                            <span>채널 생성</span>
                        </div>
                    </>
                )}
                {type === 'channel' && (
                    <>
                        <div
                            style={{ fontSize: '16px',
                                    fontStyle: 'normal', fontWeight: '400',
                                    lineHeight: '150%', justifyContent: 'center',
                                    display: 'flex', alignItems: 'center',
                                    color: 'var(--on-surface-active, #0A0A0A)'

                        }}>
                            <img
                                width='34px'
                                height='34px'
                                src={img}
                                alt="channelprofile"
                                style={{ borderRadius: '200px', border: '0.367px solid var(--surface-outline, rgba(10, 10, 10, 0.10))', background: 'white' }}
                            ></img>
                            <span
                                style={{ marginLeft: '12px', overflow: 'hidden',
                                        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                        width: '210px'
                            }}>
                                {name}
                            </span>
                        </div>
                    </>
                )}

            </div>
        </>
    );
}

export default ChannelList;