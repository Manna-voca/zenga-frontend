
import React, { useState } from "react";
import { ReactComponent as OutImg } from "../images/out.svg";
import { ReactComponent as DuplicateImg } from "../images/duplicate.svg";
import Toast from "./Toast";

interface Props {
    func? : any;
};

const PopupComplaint = ({func}: Props) => {

    const [toastState, setToastState] = useState<boolean>(false);
    const [isDuplicateSuccess, setIsDuplicateSuccess] = useState<boolean>(false);

    const userAgent = navigator.userAgent;

    const handleOutImgClick = () => {
        func(0);
    };

    const handleDuplicateImgClick = async () => {
        try{
            await navigator.clipboard.writeText('www.instagram.com/moa_zzi/');
            if(userAgent.match(/Android/i)){

            }
            else{
                setIsDuplicateSuccess(true);
                setToastState(true);
            }
        } catch(e) {
            if(userAgent.match(/Android/i)){

            }
            else{
                setIsDuplicateSuccess(false);
                setToastState(true);
            }
        }
    };

    return(
        <>
            <div
                style={{ position: 'fixed', top: 0, left: 0,
                        right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.50)',
                        zIndex: '2'
                }}>
            </div>
            <div
                style={{ position: 'fixed', top: '247px', width: 'calc(100vw - 25px)',
                        margin: '0 13px 0 12px', backgroundColor: 'white',
                        height: '231px', borderRadius: '8px',
                        display: 'flex', flexDirection: 'column',
                        zIndex: '3', maxWidth: 'calc(500px - 25px)'
            }}>
                <div style={{ height: '16px' }}></div>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', margin: '0 16px 0 16px'
                }}>
                    <div style={{ height: '24px', width: '24px'}}></div>
                    <div style={{ display: 'flex',
                                justifyContent: 'center', alignItems: 'center',
                                height: '20px', fontSize: '16px', fontStyle: 'normal',
                                fontWeight: '700'
                    }}>
                        <span>신고하기</span>
                    </div>
                    <OutImg
                        onClick={handleOutImgClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div style={{ height: '28px' }}></div>
                <div
                    style={{ margin: '0 20px 0 20px', height: '67px',
                            fontSize: '14px', fontStyle: 'normal',
                            fontWeight: '400', lineHeight: '150%'
                }}>
                    <span>욕설, 비방, 허위사실 유포 등 서비스 이용에 불편한 내용이 있다면 해당 내용을 캡쳐한 이미지를 DM으로 보내주세요. 최대한 빠르게 처리해 드릴게요.</span>
                </div>
                <div style={{ height: '20px' }}></div>
                <div
                    style={{ height: '60px', margin: '0 16px 0 16px',
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', borderRadius: '8px',
                            background: 'var(--surface-surface, #FAFAFA)'

                }}>
                    <div
                        style={{ height: '20px', display: 'flex',
                                justifyContent: 'center', alignItems: 'center',
                                fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '500', marginLeft: '16px'

                    }}>
                        <a
                            href="https://www.instagram.com/moa_zzi/"
                            target="_blank"
                            style={{ textDecoration: 'none',
                                    color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))',
                        }}>
                            www.instagram.com/moa_zzi/
                        </a>
                    </div>
                    <DuplicateImg
                        fill="#0A0A0A"
                        fillOpacity={0.7}
                        onClick={handleDuplicateImgClick}
                        style={{ marginRight: '16px', cursor: 'pointer' }}
                    />
                </div>
            </div>
            {toastState &&
                <Toast type={isDuplicateSuccess ? "O" : "X"} func={() => setToastState(false)}></Toast>
            }
        </>
    );
}

export default PopupComplaint;