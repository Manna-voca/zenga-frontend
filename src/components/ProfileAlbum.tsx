import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import testImg from '../images/jun.png';
import whaleImg from '../images/whalealbum.png';

interface Props{
    who: "my" | "member";
};

const ProfileAlbum = ({who}: Props) => {
    const cardDummy: Array<string> = [
        testImg,
        testImg,
        testImg,
        testImg,
        testImg,
        testImg,
        testImg,
        testImg,
        testImg,
        testImg,
        testImg,
    ];

    const navigate = useNavigate();

    const [isAlbum0, setIsAlbum0] = useState<boolean>(false);

    return(
        <>
            {isAlbum0 ? (
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
                        {cardDummy.map((item, index) => {
                            return <CardContainer
                                        onClick={() => navigate('/album/1', {state: {who: who, initialNum: index}})}
                                        style={{ backgroundImage: `url(${item})`}}
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