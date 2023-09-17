import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import GatheringList from "../components/GatheringList";
import testUserImg from '../images/channelprofile.png';
import testImg from '../images/jun.png';
import axios from "axios";
import { ReactComponent as TwowhaleImg } from "../images/twowhale.svg";

interface meetupInfoProps{
    content: Array<any>;
    hasNext: boolean;
    page: number;
    size: number;
}

const MyMeetup = () => {
    const location = useLocation();
    const MEMBER_ID = localStorage.getItem("memberId");
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };

    const [meetupState, setMeetupState] = useState<string>(location.state.meetupState);
    const [meetupInfo, setMeetupInfo] = useState<meetupInfoProps|null>(null);

    const handleMeetupStateBtnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setMeetupState(event.currentTarget.id);
    };


    const getMeetupList = async () => {
        let state = "COMPLETED";
        if(meetupState === "1"){
            state = "RECRUITING";
        }
        else if(meetupState === "2"){
            state = "IN_PROGRESS";
        }
        await axios.get(`${SERVER_URL}/members/${MEMBER_ID}/parties?state=${state}`, CONFIG).then((res) => {
            console.log(res.data.data);
            setMeetupInfo(res.data.data);
        })
    };

    useEffect(() => {
        getMeetupList();
    }, [meetupState]);

    return(
        <>
            <Header type="back" text="나의 모임"></Header>
            <div style={{ height: '12px' }}></div>
            <div style={{ margin: '0 20px 0 20px' }}>
                <div
                    style={{ display: 'flex', alignItems: 'flex-start',
                            gap: '10px'
                }}>
                    <div
                        onClick={handleMeetupStateBtnClick}
                        id="1"
                        style={{ height: '22px', padding: '4px 14px',
                                display: 'flex', justifyContent: 'center',
                                alignItems: 'center', borderRadius: '100px',
                                border: meetupState === "1" ? '' : '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10))',
                                background: meetupState === "1" ? 'var(--primary-primary-500, #1F94FF)' : 'var(--surface-background, #FFF)',
                                color: meetupState === "1" ? 'var(--on-primary-active, #FCFCFC)' : 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))',
                                fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '500', lineHeight: '150%',
                                cursor: 'pointer'
                    }}>
                        <div>모집중</div>
                    </div>
                    <div
                        onClick={handleMeetupStateBtnClick}
                        id="2"
                        style={{ height: '22px', padding: '4px 14px',
                                display: 'flex', justifyContent: 'center',
                                alignItems: 'center', borderRadius: '100px',
                                border: meetupState === "2" ? '' : '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10))',
                                background: meetupState === "2" ? 'var(--primary-primary-500, #1F94FF)' : 'var(--surface-background, #FFF)',
                                color: meetupState === "2" ? 'var(--on-primary-active, #FCFCFC)' : 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))',
                                fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '500', lineHeight: '150%',
                                cursor: 'pointer'
                    }}>
                        <div>진행중</div>
                    </div>
                    <div
                        onClick={handleMeetupStateBtnClick}
                        id="3"
                        style={{ height: '22px', padding: '4px 14px',
                                display: 'flex', justifyContent: 'center',
                                alignItems: 'center', borderRadius: '100px',
                                border: meetupState === "3" ? '' : '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10))',
                                background: meetupState === "3" ? 'var(--primary-primary-500, #1F94FF)' : 'var(--surface-background, #FFF)',
                                color: meetupState === "3" ? 'var(--on-primary-active, #FCFCFC)' : 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))',
                                fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '500', lineHeight: '150%',
                                cursor: 'pointer'
                    }}>
                        <div>완료</div>
                    </div>
                </div>
                <div style={{ height: '20px' }}></div>
                {meetupInfo?.content.length === 0 ? (
                    <>
                        <div style={{ height: '100px' }}></div>
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
                                    {meetupState === '3' ? '참여한' : '참여 중인'}&nbsp;
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {meetupInfo?.content.map((item, index) => {
                                return(
                                    <GatheringList
                                        key={item.partyId}
                                        meetupId={item.partyId}
                                        title={item.title}
                                        image={item.partyImageUrl === "" ? undefined : item.partyImageUrl}
                                        date={item.partyDate}
                                        location={item.location}
                                        userImg={item.openMemberProfileImageUrl}
                                        userName={item.openMemberName}
                                        currentNum={item.joinMemberCount}
                                        maxNum={item.maxCapacity}
                                    ></GatheringList>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default MyMeetup;