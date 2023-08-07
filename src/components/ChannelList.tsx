import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as PlusImg } from "../images/plus.svg";
import channelprofileImg from "../images/channelprofile.png";

// 나중에 필요한 요소 더 추가할 예정
interface Props {
    type? : string; // new || channel
    name? : string;
};

const ChannelList = ({type = 'channel', name}: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if(type === 'new'){
            navigate('/createchannel');
        }
        else if(type === 'channel'){

        }
    };

    return(
        <>
            <div
                onClick={handleClick}
                style={{ width: '260px', height: '36px',
                        padding: '12px 20px 12px 20px', display: 'flex',
                        alignItems: 'center', cursor: 'pointer',
                        borderBottom: '0.5px solid var(--surface-outline, rgba(10, 10, 10, 0.10))'
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
                            <img width='36px' height='36px' src={channelprofileImg} alt="channelprofile"></img>
                            <span style={{ marginLeft: '12px' }}>{name}</span>
                        </div>
                    </>
                )}

            </div>
        </>
    );
}

export default ChannelList;