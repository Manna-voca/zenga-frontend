import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularImage from "./CircularImage";

interface Props {
    userImg: string;
    userName: string;
    userId: number;
    isChannelAdmin?: true;
};

const BtnProfileThumbnail = ({userImg, userName, userId, isChannelAdmin}: Props) => {
    const navigate = useNavigate();
    const { channelCode } = useParams();

    const handleProfileClick = () => {
        if(`${userId}` === localStorage.getItem("memberId")){
            navigate(`/${channelCode}/mypage`);
        }
        else{
            navigate(`/${channelCode}/memberpage/${userId}`);
        }
    };

    return(
        <>
            <div
                onClick={handleProfileClick}
                title={userName}
                style={{ width: '36px', height: '56px',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'flex-start', gap: '4px',
                        cursor: 'pointer'
            }}>
                <CircularImage
                    size="36"
                    image={userImg}
                    isChannelAdmin={isChannelAdmin}
                />
                <div
                    style={{ height: '16px', width: '36px', display: 'block',
                            alignItems: 'center', overflow: 'hidden',
                            textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))',
                            textAlign: 'center', fontSize: '12px',
                            fontStyle: 'normal', fontWeight: '500',
                            wordBreak: 'break-all'
                }}>
                    {userName}
                </div>
            </div>
        </>
    );
}

export default BtnProfileThumbnail;