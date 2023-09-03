import React from "react";
import { useState } from "react";
import testImg from '../images/jun.png';
import whaleImg from '../images/whalealbum.png';

interface Props{
    who: "my" | "member";
};

const ProfileAlbum = ({who}: Props) => {

    const [isAlbum0, setIsAlbum0] = useState<boolean>(false);

    return(
        <>
            {isAlbum0 ? (
                <>
                    <div style={{ height: '110px' }}></div>
                    <div
                        style={{ display: 'flex', height: '140px',
                                flexDirection: 'column',
                                alignItems: 'center', gap: '20px'
                    }}>
                        <img width={72} height={72} src={whaleImg}/>
                        <div
                            style={{ color: 'var(--on-surface-active, #0A0A0A)',
                                    textAlign: 'center', fontSize: '16px',
                                    fontStyle: 'normal', lineHeight: '150%'
                        }}>
                            {who === "my" ? (
                                <>
                                    <span style={{ fontWeight: '400' }}>
                                        모임에 참여하고
                                    </span>
                                    <br></br>
                                    <span style={{ fontWeight: '600' }}>
                                        앨범 카드
                                    </span>
                                    <span style={{ fontWeight: '400' }}>
                                        를 만들어 보세요
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span style={{ fontWeight: '400' }}>
                                        아직 완성된
                                    </span>
                                    <br></br>
                                    <span style={{ fontWeight: '600' }}>
                                        앨범 카드
                                    </span>
                                    <span style={{ fontWeight: '400' }}>
                                        가 없어요
                                    </span>
                                </>
                            )}
                            
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        style={{ display: 'flex', flexWrap: 'wrap'
                    }}>
                        <div
                            style={{ width: '33.33333333333333333333333333333333333%',
                                    aspectRatio: '67 / 107', background: 'gray',
                                    backgroundImage: `url(${testImg})`,
                                    backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        }}></div>
                        <div
                            style={{ width: '33.33333333333333333333333333333333333%',
                                    aspectRatio: '67 / 107', background: 'gray',
                                    backgroundImage: `url(${testImg})`,
                                    backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        }}></div>
                        <div
                            style={{ width: '33.33333333333333333333333333333333333%',
                                    aspectRatio: '67 / 107', background: 'gray',
                                    backgroundImage: `url(${testImg})`,
                                    backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        }}></div>
                        <div
                            style={{ width: '33.33333333333333333333333333333333333%',
                                    aspectRatio: '67 / 107', background: 'gray',
                                    backgroundImage: `url(${testImg})`,
                                    backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        }}></div>
                        <div
                            style={{ width: '33.33333333333333333333333333333333333%',
                                    aspectRatio: '67 / 107', background: 'gray',
                                    backgroundImage: `url(${testImg})`,
                                    backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        }}></div>
                        <div
                            style={{ width: '33.33333333333333333333333333333333333%',
                                    aspectRatio: '67 / 107', background: 'gray',
                                    backgroundImage: `url(${testImg})`,
                                    backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        }}></div>
                        <div
                            style={{ width: '33.33333333333333333333333333333333333%',
                                    aspectRatio: '67 / 107', background: 'gray',
                                    backgroundImage: `url(${testImg})`,
                                    backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        }}></div>
                        <div
                            style={{ width: '33.33333333333333333333333333333333333%',
                                    aspectRatio: '67 / 107', background: 'gray',
                                    backgroundImage: `url(${testImg})`,
                                    backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        }}></div>
                        <div
                            style={{ width: '33.33333333333333333333333333333333333%',
                                    aspectRatio: '67 / 107', background: 'gray',
                                    backgroundImage: `url(${testImg})`,
                                    backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        }}></div>
                        <div
                            style={{ width: '33.33333333333333333333333333333333333%',
                                    aspectRatio: '67 / 107', background: 'gray',
                                    backgroundImage: `url(${testImg})`,
                                    backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        }}></div>
                    </div>
                </>
            )}
        </>
    );
}

export default ProfileAlbum;