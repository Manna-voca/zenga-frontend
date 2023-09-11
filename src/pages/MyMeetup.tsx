import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import GatheringList from "../components/GatheringList";
import testUserImg from '../images/channelprofile.png';
import testImg from '../images/jun.png';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

const MyMeetup = () => {
    const location = useLocation();

    dayjs.extend(relativeTime);
    dayjs.locale('ko');

    const [meetupState, setMeetupState] = useState<string>(location.state.meetupState);

    const handleMeetupStateBtnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setMeetupState(event.currentTarget.id);
    };

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
                {meetupState === "1" ? (
                    <>
                        <GatheringList
                            title="비오니까 파전에 막걸리"
                            image={testImg}
                            date={"날짜 미정"}
                            location="우이락"
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={4}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="IT분야(개발, 디자인, PM 상관 X) 북스터디 할 사람 구해요"
                            date={"날짜 미정"}
                            location={"장소 미정"}
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={8}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="IT분야(개발, 디자인, PM 상관 X) 북스터디 할 사람 구해요"
                            date={"날짜 미정"}
                            location={"장소 미정"}
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={8}
                        ></GatheringList>
                        <div style={{ height: '8px' }}></div>
                        <GatheringList
                            title="IT분야(개발, 디자인, PM 상관 X) 북스터디 할 사람 구해요"
                            date={"날짜 미정"}
                            location={"장소 미정"}
                            userImg={testUserImg}
                            userName="모아이"
                            currentNum={1}
                            maxNum={8}
                        ></GatheringList>
                    </>
                ) : (
                    meetupState === "2" ? (
                        <>
                            <GatheringList
                                title="비오니까 파전에 막걸리"
                                image={testImg}
                                date={"날짜 미정"}
                                location="우이락"
                                userImg={testUserImg}
                                userName="모아이"
                                currentNum={1}
                                maxNum={4}
                            ></GatheringList>
                            <div style={{ height: '8px' }}></div>
                            <GatheringList
                                title="IT분야(개발, 디자인, PM 상관 X) 북스터디 할 사람 구해요"
                                date={"날짜 미정"}
                                location={"장소 미정"}
                                userImg={testUserImg}
                                userName="모아이"
                                currentNum={1}
                                maxNum={8}
                            ></GatheringList>
                        </>
                    ) : (
                        <>
                            <GatheringList
                                title="비오니까 파전에 막걸리"
                                image={testImg}
                                date={"날짜 미정"}
                                location={"장소 미정"}
                                userImg={testUserImg}
                                userName="모아이"
                                currentNum={1}
                                maxNum={4}
                                isEnd={true}
                            ></GatheringList>
                            <div style={{ height: '8px' }}></div>
                            <GatheringList
                                title="IT분야(개발, 디자인, PM 상관 X) 북스터디 할 사람 구해요"
                                date={"날짜 미정"}
                                location={"장소 미정"}
                                userImg={testUserImg}
                                userName="모아이"
                                currentNum={1}
                                maxNum={8}
                                isEnd={true}
                            ></GatheringList>
                        </>
                    )
                )}
            </div>
        </>
    );
}

export default MyMeetup;