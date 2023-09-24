import React from "react";

interface Props{
    point: number;
    date: string;
    text: string;
};

const PointList = ({point, date, text}: Props) => {
    return(
        <>
            <div
                style={{ display: 'flex',
                        alignItems: 'flex-start', justifyContent: 'center',
                        borderBottom: '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10))',
                        padding: '0 20px 20px 20px'
            }}>
                <div
                    style={{ width: '100%',
                            display: 'flex', flexDirection: 'column',
                            gap: '2px',
                }}>
                    <div
                        style={{ color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))',
                                height: '20px', fontSize: '12px',
                                fontStyle: 'normal', fontWeight: '400',
                                lineHeight: '160%'
                    }}>
                        {date}
                    </div>
                    <div
                        style={{ display: 'flex', alignItems: 'center',
                                justifyContent: 'space-between',
                                color: 'var(--on-surface-active, #0A0A0A)',
                                fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '600', lineHeight: '150%', gap: '10px'
                    }}>
                        <div style={{ whiteSpace: 'pre-line', wordBreak: 'break-all' }}>
                            {text}
                        </div>
                        <div
                            style={{ display: 'flex', justifyContent: 'flex-end',
                                    gap: '8px', whiteSpace: 'pre'
                        }}>
                            <div style={{ fontWeight: '400' }}>
                                {point}
                            </div>
                            <div>
                                포인트
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PointList;