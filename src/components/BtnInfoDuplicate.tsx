import React, { useState } from "react";
import {ReactComponent as DuplicateImg} from "../images/duplicate.svg";
import Toast from "./Toast";

interface Props {
    label: string;
    text: string;
    message: string;
};

const BtnInfoDuplicate = ({label, text, message}: Props) => {

    const [toastState, setToastState] = useState<boolean>(false);

    const handleDuplicateImgClick = async () => {
        try{
            await navigator.clipboard.writeText(text);
            setToastState(true);
        } catch(e) {
            alert('클립보드 복사 실패');
            setToastState(true);
        }
    };

    return(
        <>
            <div
                style={{ display: 'felx', flexDirection: 'column',
                        gap: '4px', alignItems: 'flex-start'
            }}>
                <div
                    style={{ display: 'flex', alignItems: 'center',
                            height: '21px', fontSize: '14px', fontStyle: 'normal',
                            fontWeight: '500',
                            color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
                }}>
                    <span>{label}</span>
                </div>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', borderRadius: '8px', height: '44px',
                            border: '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10))',
                            background: 'var(--surface-input, #FFF)'
                }}>
                    <div
                        style={{ height: '24px', display: 'flex',
                                alignItems: 'center', marginLeft: '16px',
                                fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '500'
                    }}>
                        <span>{text}</span>
                    </div>
                    <DuplicateImg
                        fill="#1F94FF"
                        fillOpacity={1}
                        onClick={handleDuplicateImgClick}
                        style={{ marginRight: '16px', cursor: 'pointer' }}
                    />
                </div>
                <div
                    style={{ display: 'flex', alignItems: 'center',
                            height: '30px', fontSize: '12px', fontStyle: 'normal',
                            fontWeight: '400',
                            color: 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))'
                }}>
                    <span>{message}</span>
                </div>
            </div>
            {toastState &&
                <Toast type={toastState ? "O" : "X"} func={() => setToastState(false)}></Toast>
            }
        </>
    );
}

export default BtnInfoDuplicate;