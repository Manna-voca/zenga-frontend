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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MeetupHome = () => {
    const navigate = useNavigate();
    dayjs.extend(relativeTime);
    dayjs.locale('ko');
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };
    const { channelCode } = useParams();

    const [width, setWidth] = useState(window.innerWidth);

    const [isLess10, setIsLess10] = useState<boolean>(false);

    const [meetupList, setMeetupList] = useState<Array<any>>([]);

    useEffect(() => {
        axios.get(`${SERVER_URL}/party/list?channelId=${localStorage.getItem("channelId")}`, CONFIG).then((res) => {
            console.log(res.data.data);
            setMeetupList(res.data.data.content);
        });
        axios.get(`${SERVER_URL}/channels/${localStorage.getItem("channelId")}/validity`, CONFIG).then((res) => {
            setIsLess10(!res.data.data.isValid);
        })

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
                    {meetupList.length === 0 ? (
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
                                    <span style={{ fontWeight: '400' }}>
                                        아직&nbsp;
                                    </span>
                                    <span style={{ fontWeight: '600' }}>
                                        모임
                                    </span>
                                    <span style={{ fontWeight: '400' }}>
                                        이 없어요
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
                                {meetupList.map((item, index) => {
                                    return (
                                    <>
                                        <GatheringList
                                            key={item.partyId}
                                            title={item.title}
                                            image={item.partyImageUrl === "" ? undefined : item.partyImageUrl}
                                            date={item.partyDate}
                                            location={item.location}
                                            userImg={item.openMemberProfileImageUrl}
                                            userName={item.openMemberName}
                                            currentNum={item.joinMemberCount}
                                            maxNum={item.maxCapacity}
                                            meetupId={item.partyId}
                                        />
                                        <div style={{height: "8px"}}></div>
                                        </>
                                    )
                                })}
                                <div style={{ height: '57px' }}></div>
                            </div>
                        </>
                    )}
                    <div
                        onClick={() => navigate(`/${channelCode}/create-meetup`)}
                        style={{ height: '60px', width: '60px', borderRadius: '30px',
                                background: 'var(--primary-primary-500, #1F94FF)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                position: 'fixed', boxSizing: 'border-box',
                                bottom: '65px', cursor: 'pointer',
                                right: width >= 500 ? 'calc(50% - 230px)' : '20px'
                    }}>
                        <WhiteplusImg />
                    </div>
                </>
            )}
            <Navbar state={2}></Navbar>
        </>
    );
}

export default MeetupHome;