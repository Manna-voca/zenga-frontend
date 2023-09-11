import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ComplimentImg } from "../images/compliment.svg";
import { ReactComponent as GatheringImg } from "../images/gathering.svg";
import { ReactComponent as MemberImg } from "../images/member.svg";
import { ReactComponent as MyImg } from "../images/my.svg";

// 나중에 필요한 요소 더 추가할 예정
interface Props {
    state? : number;
};

const Navbar = ({state = 1}: Props) => {
    const navigate = useNavigate();
    const { channelCode } = useParams();

    // navbar의 순서대로 1, 2, 3, 4라는 숫자 부여
    const [check, setCheck] = useState<number>(state);

    const handleComplimentImgClick = () => {
        setCheck(1);
        navigate(`/${channelCode}/praise`, {replace: true});
    };

    const handleGatheringImgClick = () => {
        setCheck(2);
        navigate(`/${channelCode}/meetup-home`, {replace: true});
    };

    const handleMemberImgClick = () => {
        setCheck(3);
        navigate(`/${channelCode}/member-list`, {replace: true});
    };

    const handleMyImgClick = () => {
        setCheck(4);
        localStorage.removeItem("mypage");
        navigate(`/${channelCode}/mypage`, {replace: true});
    };

    return(
        <>
            <div style={{ padding: '5px 20px 8px 20px', height: '57px',
                        borderTop: '0.5px solid var(--surface-outline, rgba(10, 10, 10, 0.10))',
                        backgroundColor: 'white', width: "100%", maxWidth: "500px",
                        position: 'fixed', boxSizing: "border-box", bottom: '0px',
                        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'
            }}>
                <div
                    onClick={handleComplimentImgClick} 
                    style={{ alignItems: 'center', justifyContent: 'center',
                            height: '44px', width: '44px', display: 'flex',
                            flexDirection: 'column', cursor: 'pointer'
                 }}>
                    <ComplimentImg
                        fill={check === 1 ? '#1F94FF' : '#0A0A0A'}
                        fillOpacity={check === 1 ? 1 : 0.7 }
                    />
                    <div style={{ height: '4px' }}></div>
                    <div style={{ fontSize: '8px', fontStyle: 'normal',
                                fontWeight: '500', lineHeight: '150%',
                                color : check === 1 ? 'var(--primary-primary-500, #1F94FF)' : ''
                    }}>
                        <span>칭찬</span>
                    </div>
                </div>
                <div
                    onClick={handleGatheringImgClick} 
                    style={{ alignItems: 'center', justifyContent: 'center',
                            height: '44px', width: '44px', display: 'flex',
                            flexDirection: 'column', cursor: 'pointer'
                 }}>
                    <GatheringImg
                        fill={check === 2 ? '#1F94FF' : '#0A0A0A'}
                        fillOpacity={check === 2 ? 1 : 0.7 }
                    />
                    <div style={{ height: '4px' }}></div>
                    <div style={{ fontSize: '8px', fontStyle: 'normal',
                                fontWeight: '500', lineHeight: '150%',
                                color : check === 2 ? 'var(--primary-primary-500, #1F94FF)' : ''
                    }}>
                        <span>모임</span>
                    </div>
                </div>
                <div
                    onClick={handleMemberImgClick}
                    style={{ alignItems: 'center', justifyContent: 'center',
                            height: '44px', width: '44px', display: 'flex',
                            flexDirection: 'column', cursor: 'pointer'
                 }}>
                    <MemberImg
                        fill={check === 3 ? '#1F94FF' : '#0A0A0A'}
                        fillOpacity={check === 3 ? 1 : 0.7 }
                    />
                    <div style={{ height: '4px' }}></div>
                    <div style={{ fontSize: '8px', fontStyle: 'normal',
                                fontWeight: '500', lineHeight: '150%',
                                color : check === 3 ? 'var(--primary-primary-500, #1F94FF)' : ''
                    }}>
                        <span>멤버</span>
                    </div>
                </div>
                <div
                    onClick={handleMyImgClick}
                    style={{ alignItems: 'center', justifyContent: 'center',
                            height: '44px', width: '44px', display: 'flex',
                            flexDirection: 'column', cursor: 'pointer'
                 }}>
                    <MyImg
                        fill={check === 4 ? '#1F94FF' : '#0A0A0A'}
                        fillOpacity={check === 4 ? 1 : 0.7 }
                    />
                    <div style={{ height: '4px' }}></div>
                    <div style={{ fontSize: '8px', fontStyle: 'normal',
                                fontWeight: '500', lineHeight: '150%',
                                color : check === 4 ? 'var(--primary-primary-500, #1F94FF)' : ''
                    }}>
                        <span>MY</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;