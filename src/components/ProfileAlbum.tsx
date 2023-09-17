import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import whaleImg from '../images/whalealbum.png';
import axios from "axios";

interface Props{
    who: "my" | "member";
    memberId: string | null | undefined;
};

const ProfileAlbum = ({who, memberId}: Props) => {
    const navigate = useNavigate();
    const { channelCode } = useParams();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };

    const [albumList, setAlbumList] = useState<Array<any>>([]);

    const getAlbumInfo = async () => {
        await axios.get(`${SERVER_URL}/album/list?memberId=${memberId}`, CONFIG).then((res) => {
            console.log(res.data.data);
            setAlbumList(res.data.data.albumList);
        }).catch((err) => console.error(err));
    };

    useEffect(() => {
        getAlbumInfo();
    }, []);

    return(
        <>
            {albumList.length === 0 ? (
                <>
                    <div style={{ height: '110px' }}></div>
                    <div
                        style={{ display: 'flex', height: '140px',
                                flexDirection: 'column',
                                alignItems: 'center', gap: '20px'
                    }}>
                        <img width={72} height={72} src={whaleImg}/>
                        <div
                            style={{ color: 'var(--on-surface-active, #0A0A0A)',
                                    textAlign: 'center', fontSize: '16px',
                                    fontStyle: 'normal', lineHeight: '150%'
                        }}>
                            {who === "my" ? (
                                <>
                                    <span style={{ fontWeight: '400' }}>
                                        모임에 참여하고
                                    </span>
                                    <br></br>
                                    <span style={{ fontWeight: '600' }}>
                                        앨범 카드
                                    </span>
                                    <span style={{ fontWeight: '400' }}>
                                        를 만들어 보세요
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span style={{ fontWeight: '400' }}>
                                        아직 완성된
                                    </span>
                                    <br></br>
                                    <span style={{ fontWeight: '600' }}>
                                        앨범 카드
                                    </span>
                                    <span style={{ fontWeight: '400' }}>
                                        가 없어요
                                    </span>
                                </>
                            )}
                            
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        style={{ display: 'flex', flexWrap: 'wrap'
                    }}>
                        {albumList.map((item, index) => {
                            return <CardContainer
                                        onClick={() => navigate(`/${channelCode}/album/${memberId}`, {state: {who: who, initialNum: index}})}
                                        style={{ backgroundImage: `url(${item.imageUrl})`, cursor: 'pointer'}}
                                    />
                        })}
                    </div>
                </>
            )}
        </>
    );
}

export default ProfileAlbum;

const CardContainer = styled.div`
    width: 33.333333333333333333333333333333%;
    aspect-ratio: 67 / 107;
    background: gray;
    background-position: 50% 50%;
    background-size: cover;
`;