import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backButton from "../images/back.svg";
import profileImg from "../images/profile.png";
import { ReactComponent as NoticeImg } from "../images/notice.svg";
import Sidebar from "./Sidebar";

// 타입: 뒤로가기, 기본(동아리명, 알림), 모임 만들기, 모임 상세
//       알림, 참여한 멤버, 댓글, 모임 수정, 카드 만들기
// 나중에 필요한 요소 추가 예정(이미지, 댓글수, 상태 등등)
interface Props {
    type? : string;
    link? : string;
};

const Header = ({type, link = '/login'}: Props) => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(link)
    };


    const [sidebarState, setSidebarState] = useState<number>(0);

    const handleChannelButtonClick = () => {
        setSidebarState(1);
    };

    const handleOutsideClick = () => {
        setSidebarState(0);
    };

    if(type === 'back'){
        return(
            <div style={{ height: '44px', paddingLeft: '16px',
                        position: 'sticky', top: '0px', backgroundColor: 'white'
            }}>
                <div 
                    onClick={handleBackButtonClick}
                    style={{cursor: 'pointer'}}>
                    <img width='24px' height='24px' src={backButton} alt="back"></img>
                </div>
            </div>
        );
    }
    else if(type === 'common'){
        return(
            <>
                <div style={{ height: '44px', padding: '0 20px 0 16px',
                            alignItems: 'center', display: 'flex',
                            justifyContent: 'space-between',
                            position: 'sticky', top: '0px', backgroundColor: 'white'
                }}>
                    <div 
                        onClick={handleChannelButtonClick}
                        style={{ fontSize: '16px', fontStyle: 'normal',
                                fontWeight: '400', lineHeight: '150%',
                                cursor: 'pointer', alignItems: 'center',
                                display: 'flex'
                    }}>
                        <img width='24px' height='24px' src={profileImg} alt="channelprofile"></img>
                        <span style={{ marginLeft: '10px' }}>멋쟁이사자처럼 10기</span>
                    </div>
                    <NoticeImg />
                </div>
                {sidebarState === 1 && (
                    <>
                        <div
                            onClick={handleOutsideClick}
                            style={{ position: 'fixed', top: 0, left: 0,
                                    right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.50)',
                                    zIndex: '2'
                        }}>
                        </div>
                        <Sidebar></Sidebar>
                    </>
                )}
            </>
        );
    }
    else{
        return(
            <div style={{ height: '44px' }}>
    
            </div>
        );
    }
}

export default Header;