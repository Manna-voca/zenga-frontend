import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowImg } from "../images/arrow.svg";
import GatheringList from "./GatheringList";
import testUserImg from '../images/channelprofile.png';
import testImg from '../images/jun.png';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from "axios";


const ProfileMeetup = () => {
    const navigate = useNavigate();
    const MEMBER_ID = localStorage.getItem("memberId");
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };
    
    dayjs.extend(relativeTime);
    dayjs.locale('ko');

    const handleArrowBtnClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const meetupState : string = event.currentTarget.id
        navigate('/my-meetup', { state: {meetupState}});
    };

    const getMeetupInfo = async () => {
        await axios.get(`${SERVER_URL}/members/${MEMBER_ID}/parties/all`, CONFIG).then((res) => {
            console.log(res.data.data);
        })
    };

    useEffect(() => {
        getMeetupInfo();
    }, []);

    return(
        <>
            <div style={{ height: '18px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px'
            }}>
                <div
                    style={{ height: '24px', display: 'flex',
                            alignItems: 'center', justifyContent: 'space-between',
                            color: 'var(--on-surface-active, #0A0A0A)',
                            fontSize: '16px', fontStyle: 'normal',
                            fontWeight: '600', lineHeight: '150%'
                }}>
                    <div>모집중</div>
                    <ArrowImg
                        id="1"
                        onClick={handleArrowBtnClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div style={{ height: '14px' }}></div>
                <GatheringList
                    meetupId={1}
                    title="비오니까 파전에 막걸리"
                    image={testImg}
                    date={"날짜 미정"}
                    location={"장소 미정"}
                    userImg={testUserImg}
                    userName="모아이"
                    currentNum={1}
                    maxNum={4}
                ></GatheringList>
                <div style={{ height: '8px' }}></div>
                <GatheringList
                    meetupId={1}
                    title="IT분야(개발, 디자인, PM 상관 X) 북스터디 할 사람 구해요"
                    date={"날짜 미정"}
                    location={"장소 미정"}
                    userImg={testUserImg}
                    userName="모아이"
                    currentNum={1}
                    maxNum={8}
                ></GatheringList>
                <div style={{ height: '22px' }}></div>




                <div
                    style={{ height: '24px', display: 'flex',
                            alignItems: 'center', justifyContent: 'space-between',
                            color: 'var(--on-surface-active, #0A0A0A)',
                            fontSize: '16px', fontStyle: 'normal',
                            fontWeight: '600', lineHeight: '150%'
                }}>
                    <div>진행중</div>
                    <ArrowImg
                        id="2"
                        onClick={handleArrowBtnClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div style={{ height: '14px' }}></div>
                <GatheringList
                    meetupId={1}
                    title="비오니까 파전에 막걸리"
                    image={testImg}
                    date={"날짜 미정"}
                    location={"장소 미정"}
                    userImg={testUserImg}
                    userName="모아이"
                    currentNum={1}
                    maxNum={4}
                ></GatheringList>
                <div style={{ height: '8px' }}></div>
                <GatheringList
                    meetupId={1}
                    title="IT분야(개발, 디자인, PM 상관 X) 북스터디 할 사람 구해요"
                    date={"날짜 미정"}
                    location={"장소 미정"}
                    userImg={testUserImg}
                    userName="모아이"
                    currentNum={1}
                    maxNum={8}
                ></GatheringList>
                <div style={{ height: '22px' }}></div>





                <div
                    style={{ height: '24px', display: 'flex',
                            alignItems: 'center', justifyContent: 'space-between',
                            color: 'var(--on-surface-active, #0A0A0A)',
                            fontSize: '16px', fontStyle: 'normal',
                            fontWeight: '600', lineHeight: '150%'
                }}>
                    <div>완료</div>
                    <ArrowImg
                        id="3"
                        onClick={handleArrowBtnClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div style={{ height: '14px' }}></div>
                <GatheringList
                    meetupId={1}
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
                    meetupId={1}
                    title="IT분야(개발, 디자인, PM 상관 X) 북스터디 할 사람 구해요"
                    date={"날짜 미정"}
                    location={"장소 미정"}
                    userImg={testUserImg}
                    userName="모아이"
                    currentNum={1}
                    maxNum={8}
                    isEnd={true}
                ></GatheringList>
                <div style={{ height: '36px' }}></div>
            </div>
        </>
    );
}

export default ProfileMeetup;