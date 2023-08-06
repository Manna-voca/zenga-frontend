import React from "react";

// 나중에 필요한 요소 추가 예정
interface Props {
    func? : any;
};

const Popup2 = ({func}: Props) => {

    const handleButtonClick = () => {
        func(0);
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
                style={{ position: 'fixed', top: '269px', width: 'calc(100vw - 25px)',
                        margin: '0 12px 0 13px', backgroundColor: 'white',
                        height: '187px', borderRadius: '8px',
                        display: 'flex', justifyContent: 'center',
                        zIndex: '3', maxWidth: 'calc(500px - 25px)'
            }}>
                <div
                    style={{ margin: '28px 0 16px 0', display: 'flex',
                            flexDirection: 'column', alignItems: 'center',
                            width: '100%'
                }}>
                    <div
                        style={{ height: '27px', fontSize: '16px',
                                fontStyle: 'normal', fontWeight: '700',
                                lineHeight: '150%', display: 'flex',
                                justifyContent: 'center', alignItems: 'center'

                    }}>
                        <span>모임 참여를 취소하시나요?</span>
                    </div>
                    <div
                        style={{ height: '42px', fontSize: '14px',
                        fontStyle: 'normal', fontWeight: '400',
                        lineHeight: '150%', display: 'flex',
                        justifyContent: 'center', textAlign: 'center',
                        marginBottom: '25px', marginTop: '5px'
                    }}>
                        <span>참여를 취소해도 모임이 모집 중이라면<br></br>재참여를 할 수 있어요</span>
                    </div>
                    <div
                        style={{ display: 'flex', alignItems: 'center', padding: '0 16px 0 16px',
                                justifyContent: 'space-around', width: 'calc(100% - 32px)'
                    }}>
                        <div
                            onClick={handleButtonClick}
                            style={{ height: '44px', width: '152px', cursor: 'pointer',
                                    borderRadius: '30px', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    background: 'var(--on-surface-disabled, rgba(10, 10, 10, 0.35))',
                                    fontSize: '14px', fontStyle: 'normal',
                                    fontWeight: '600', lineHeight: '150%',
                                    color: 'var(--on-primary-active, #FCFCFC)'
                        }}>
                            <span>취소</span>
                        </div>
                        <div
                            onClick={handleButtonClick}
                            style={{ height: '44px', width: '152px', cursor: 'pointer',
                                    borderRadius: '30px', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    background: 'var(--primary-primary-500, #1F94FF)',
                                    fontSize: '14px', fontStyle: 'normal',
                                    fontWeight: '600', lineHeight: '150%',
                                    color: 'var(--on-primary-active, #FCFCFC)'
                        }}>
                            <span>확인</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Popup2;