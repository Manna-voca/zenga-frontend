import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { ReactComponent as WhiteplusImg } from "../images/whiteplus.svg";
import { ReactComponent as TwowhaleImg } from "../images/twowhale.svg";
import GatheringList from "../components/GatheringList";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import testUserImg from '../images/channelprofile.png';
import testImg from '../images/jun.png';
import { useNavigate } from "react-router-dom";

const MeetupHome = () => {
    const navigate = useNavigate();
    dayjs.extend(relativeTime);
    dayjs.locale('ko');
    const [width, setWidth] = useState(window.innerWidth);

    const [isLess10, setIsLess10] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <>
            <Header type='common' isChannelAdmin={false}></Header>
            {isLess10 ? (
                <>
                    <div style={{ height: '162px' }}></div>
                    <div
                        style={{ display: 'flex', height: '140px',
                                flexDirection: 'column',
                                alignItems: 'center', gap: '20px'
                    }}>
                        <TwowhaleImg/>
                        <div
                            style={{ color: 'var(--on-surface-active, #0A0A0A)',
                                    textAlign: 'center', fontSize: '16px',
                                    fontStyle: 'normal', lineHeight: '150%'
                        }}>
                            <span style={{ fontWeight: '600' }}>
                                멤버 10명
                            </span>
                            <span style={{ fontWeight: '400' }}>
                                이 넘어야<br></br>모임을 만들 수 있어요
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        style={{ margin: '0 20px 0 20px'
                    }}>
                        <div style={{ height: '20px' }}></div>
                        <GatheringList
                            title="비오니까 파전에 막걸리"
                            image={testImg}
                            date={dayjs("2023-07-13 20:00:00").toDate()}
                            location="우이락"
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={4}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="IT분야(개발, 디자인, PM 상관 X) 북스터디 할 사람 구해요"
                            date={null}
                            location={null}
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={8}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="비오니까 파전에 막걸리"
                            image={testImg}
                            date={null}
                            location="우리집"
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={4}
                            maxNum={7}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="QA 해주실 분 구합니다!"
                            date={dayjs("2023-07-13 13:30:00").toDate()}
                            location="숭실대 정보과학관"
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={2}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="비오니까 파전에 막걸리"
                            image={testImg}
                            date={dayjs("2023-07-13 20:00:00").toDate()}
                            location="우이락"
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={4}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="비오니까 파전에 막걸리"
                            image={testImg}
                            date={dayjs("2023-07-13 20:00:00").toDate()}
                            location="우이락"
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={4}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="비오니까 파전에 막걸리"
                            image={testImg}
                            date={dayjs("2023-07-13 20:00:00").toDate()}
                            location="우이락"
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={4}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="비오니까 파전에 막걸리"
                            image={testImg}
                            date={dayjs("2023-07-13 20:00:00").toDate()}
                            location="우이락"
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={4}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="비오니까 파전에 막걸리"
                            image={testImg}
                            date={dayjs("2023-07-13 20:00:00").toDate()}
                            location="우이락"
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={4}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="비오니까 파전에 막걸리"
                            image={testImg}
                            date={dayjs("2023-07-13 20:00:00").toDate()}
                            location="우이락"
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={4}
                        ></GatheringList>
                        <div style={{ height: '57px' }}></div>
                    </div>
                    <div
                        style={{ height: '60px', width: '60px', borderRadius: '30px',
                                background: 'var(--primary-primary-500, #1F94FF)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                position: 'fixed', boxSizing: 'border-box',
                                bottom: '65px', cursor: 'pointer',
                                right: width >= 500 ? 'calc(50% - 230px)' : '20px'
                    }}>
                        <WhiteplusImg onClick={() => navigate('/create-meetup')} />
                    </div>
                </>
            )}
            <Navbar state={2}></Navbar>
        </>
    );
}

export default MeetupHome;