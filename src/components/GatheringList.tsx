import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ClockImg } from "../images/clock.svg";
import { ReactComponent as LocationImg } from "../images/location.svg";
import { ReactComponent as PeopleImg } from "../images/people.svg"
import CircularImage from "./CircularImage";

interface Props {
    meetupId : number;
    title : string;
    image? : string;
    date : string;
    location : string;
    userImg: string;
    userName: string;
    currentNum: number;
    maxNum: number;
    isEnd?: boolean;
};

const GatheringList = ({meetupId, title, image, date,
    location, userImg, userName, currentNum, maxNum, isEnd = false}: Props) => {
    
    const navigate = useNavigate();
    const { channelCode } = useParams();
    
    const handleListClick = () => {
        navigate(`/${channelCode}/meetup-detail/${meetupId}`);
    };

    return(
        <>
            <div
                onClick={handleListClick}
                style={{ height: '72px', display: 'flex', cursor: 'pointer',
                        justifyContent: 'space-between', borderRadius: '8px',
                        background: 'var(--surface-surface, #FAFAFA)'
            }}>
                <div
                    style={{ paddingLeft: '16px', maxWidth: 'calc(100% - 32px)',
                            width: 'calc(100%-10px)',
                            paddingRight: image === undefined ? '16px' : '0px'
                }}>
                    <div style={{ height: '8px' }}></div>
                    <div
                        style={{ height: '21px', display: 'block',
                                alignItems: 'center', overflow: 'hidden',
                                color: isEnd ? 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))' : 'var(--text-text-active, var(--light-text-text-active, #0D0D0D))',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                fontSize: '14px', fontStyle: 'normal', lineHeight: '150%',
                                fontWeight: '600', wordBreak: 'break-all'
                    }}>
                        {title}
                    </div>
                    <div style={{ height: '1px' }}></div>
                    <div
                        style={{ height: '15px', display: 'flex',
                                gap: '6px', fontSize: '10px', lineHeight: '150%',
                                fontStyle: 'normal', fontWeight: '400',
                                color: isEnd ? 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))' : 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
                    }}>
                        <div
                            style={{ display: 'flex', alignItems: 'center',
                                    gap: '4px'
                        }}>
                            <ClockImg width={12} height={12} fillOpacity={isEnd ? 0.45 : 0.7}/>
                            <span>{date}</span>
                        </div>
                        <div
                            style={{ display: 'flex', alignItems: 'center',
                                    gap: '4px'
                        }}>
                            <LocationImg width={12} height={12} fillOpacity={isEnd ? 0.45 : 0.7}/>
                            <span>{location}</span>
                        </div>
                    </div>
                    <div style={{ height: '3px' }}></div>
                    <div
                        style={{ display: 'inline-flex', alignItems: 'center',
                                height: '16px', gap: '6px', fontSize: '10px',
                                fontStyle: 'normal', fontWeight: '500',
                                color: isEnd ? 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))' : 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
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
                            <PeopleImg width={12} height={12} fillOpacity={isEnd ? 0.45 : 0.7}/>
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