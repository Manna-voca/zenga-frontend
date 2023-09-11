/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";

interface Props{
    date: string;
    title: string;
    text: string;
    image: string | ArrayBuffer | null | undefined;
};

const Card = ({date, title, text, image}: Props) => {
    const textRef = useRef<HTMLDivElement>(null);

    const [isAllText, setIsAllText] = useState<boolean>(false);
    const [moreBtnState, setMoreBtnState] = useState<boolean>(false);

    useEffect(() => {
        if(textRef.current?.scrollHeight !== undefined && textRef.current?.scrollHeight > 40){
            setMoreBtnState(true);
        }
    }, []);

    return(
        <>
            <div
                style={{ height: '535px', width: '100%',
                        borderRadius: '10px', backgroundImage: `url(${image})`,
                        backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        position: 'relative'
            }}>
                <div
                    style={{ position: 'absolute', top: '20px', left: '20px',
                            height: '17px', lineHeight: '150%',
                            color: 'var(--on-primary-active, #FCFCFC)',
                            textShadow: '0px 0px 2px rgba(0, 0, 0, 0.10)',
                            fontSize: '14px', fontStyle: 'normal',
                            fontWeight: '400'
                }}>
                    {date}
                </div>
                <div
                    style={{ position: 'absolute', bottom: '20px',
                            margin: '0 20px 0 20px', display: 'flex',
                            flexDirection: 'column', justifyContent: 'flex-end',
                            gap: '4px',
                            color: 'var(--on-primary-active, #FCFCFC)',
                            textShadow: '0px 0px 2px rgba(0, 0, 0, 0.10)',
                }}>
                    <div
                        style={{ display: 'block', overflow: 'hidden',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                fontSize: '21px', fontStyle: 'normal',
                                fontWeight: '600', lineHeight: '150%',
                                wordBreak: 'break-all'
                    }}>
                        {title}
                    </div>
                    <div
                        ref={textRef}
                        css={isAllText ? allText : ellipsisText}
                    >
                        {text}
                    </div>
                    {moreBtnState &&
                        <span
                            onClick={() => setIsAllText(true)}
                            style={{ cursor: 'pointer', display: isAllText ? 'none' : '',
                                    fontSize: '14px', fontStyle: 'normal',
                                    fontWeight: '400', lineHeight: '150%',
                                    color: '#D9D9D9'
                            }}
                        >
                            [더보기]
                        </span>
                    }
                </div>
            </div>
        </>
    );
}

export default Card;

const allText = css`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    flex-basis: 40px;
    width: 100%;
    white-space: pre-wrap;
    word-break: break-all;
`;

const ellipsisText = css`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    height: 40px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
`;