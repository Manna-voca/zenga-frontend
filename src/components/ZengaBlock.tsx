import React from "react";

interface Props{
    block: string;
    date: string;
    text: string;
};

const ZengaBlock = ({block, date, text}: Props) => {
    return(
        <>
            <div
                style={{ borderRadius: '3px', height: '44px',
                        backgroundImage: `url(${block})`,
                        backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        position: 'relative'
            }}>
                <div
                    style={{ color: 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))',
                            fontFamily: 'OmyuPretty', fontSize: '9px',
                            fontStyle: 'normal', fontWeight: '400',
                            lineHeight: '150%', position: 'absolute',
                            top: '3px', left: '5px'
                }}>
                    {date}
                </div>
                <div
                    style={{ color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))',
                            fontFamily: 'OmyuPretty', fontSize: '11px',
                            fontStyle: 'normal', fontWeight: '400',
                            lineHeight: '150%', position: 'absolute',
                            bottom: '3px', left: '5px'
                }}>
                    {text}
                </div>
            </div>
        </>
    );
}

export default ZengaBlock;