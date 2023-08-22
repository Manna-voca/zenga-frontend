import React from "react";
import { ReactComponent as ClockImg } from "../images/clock.svg";
import { ReactComponent as LocationImg } from "../images/location.svg";
import { ReactComponent as PeopleImg } from "../images/people.svg"
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import CircularImage from "./CircularImage";

interface Props {
    title : string;
    image? : string;
    date : Date | null;
    location : string | null;
    userImg: string;
    userName: string;
    currentNum: number;
    maxNum: number;
};

const GatheringList = ({title, image, date = null,
    location = null, userImg, userName, currentNum, maxNum}: Props) => {
    
    dayjs.extend(relativeTime);
    dayjs.locale('ko');
    const meetingAt = dayjs(date);
    
    return(
        <>
            <div
                style={{ height: '72px', display: 'flex', cursor: 'pointer',
                        justifyContent: 'space-between', borderRadius: '8px',
                        background: 'var(--surface-surface, #FAFAFA)'
            }}>
                <div
                    style={{ paddingLeft: '16px', maxWidth: 'calc(100% - 32px)',
                            width: 'calc(100%-10px)',
                            paddingRight: image === undefined ? '16px' : '0px'
                }}>
                    <div style={{ height: '11px' }}></div>
                    <div
                        style={{ height: '14px', display: 'block',
                                alignItems: 'center', overflow: 'hidden',
                                color: 'var(--text-text-active, var(--light-text-text-active, #0D0D0D))',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '600'
                    }}>
                        {title}
                    </div>
                    <div style={{ height: '5px' }}></div>
                    <div
                        style={{ height: '15px', display: 'flex',
                                gap: '6px', fontSize: '10px',
                                fontStyle: 'normal', fontWeight: '400',
                                color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
                    }}>
                        <div
                            style={{ display: 'flex', alignItems: 'center',
                                    gap: '4px'
                        }}>
                            <ClockImg />
                            <span>{date === null ? '날짜 미정' : meetingAt.format('M월 D일(ddd) HH:mm')}</span>
                        </div>
                        <div
                            style={{ display: 'flex', alignItems: 'center',
                                    gap: '4px'
                        }}>
                            <LocationImg />
                            <span>{location === null ? '장소 미정' : location}</span>
                        </div>
                    </div>
                    <div style={{ height: '3px' }}></div>
                    <div
                        style={{ display: 'inline-flex', alignItems: 'center',
                                height: '16px', gap: '6px', fontSize: '10px',
                                fontStyle: 'normal', fontWeight: '500',
                                color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
                    }}>
                        <CircularImage
                            image={userImg}
                            size="12"
                        />
                        <span>{userName}</span>
                        <div
                            style={{ display: 'flex', alignItems: 'center',
                                    gap: '4px', fontWeight: '400'
                        }}>
                            <PeopleImg />
                            <span>{currentNum}/{maxNum}</span>
                        </div>
                    </div>
                </div>
                {image !== undefined && (
                    <>
                        <div
                            style={{ marginRight: '8px'
                        }}>
                            <div style={{ height: '8px' }}></div>
                            <div
                                style={{ backgroundImage: `url(${image})`,
                                        height: '56px', width: '56px',
                                        borderRadius: '8px', backgroundSize: 'cover',
                                        backgroundPosition: '50% 50%'
                            }}></div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default GatheringList;