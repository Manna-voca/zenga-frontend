import React from "react";

interface Props {
    type: "Blue" | "Yellow" | "Green" | "Purple" | "Orange" | "Pink" | "Default";
    number: number;
};

const BlockNumber = ({type, number}: Props) => {
    return(
        <>
            <div
                style={{ display: 'flex', width: '38px',
                            justifyContent: 'flex-start', gap: '3px'
            }}>
                <img height={18} width={18} src={`/assets/ic-block${type}.svg`} alt="" />
                <div
                    style={{ height: '18px', fontSize: '9px',
                            fontStyle: 'normal', fontWeight: '500',
                            lineHeight: '160%',
                            color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
                }}>
                    {number}
                </div>
            </div>
        </>
    );
}

export default BlockNumber;