import React from "react";
import Header from "../components/Header";
import { ReactComponent as PointsImg } from "../images/points.svg";
import PointList from "../components/PointList";

const PointDetail = () => {
    return(
        <>
            <Header type="back" text="내 포인트"></Header>
            <div style={{ height: '16px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px', borderRadius: '8px',
                        background: 'var(--surface-surface, #FAFAFA)',
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', height: '60px'
            }}>
                <div
                    style={{ display: 'flex', alignItems: 'center',
                            marginLeft: '20px', gap: '8px'
                }}>
                    <PointsImg
                        height={21}
                        width={21}
                    />
                    <div
                        style={{ color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))',
                                fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '600', lineHeight: '150%'
                    }}>
                        내 포인트
                    </div>
                </div>
                <div
                    style={{ marginRight: '20px', textAlign: 'right',
                            color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))',
                            fontSize: '14px', fontStyle: 'normal',
                            fontWeight: '600', lineHeight: '150%'
                }}>
                    10,000
                </div>
            </div>
            <div style={{ height: '36px' }}></div>
            <div
                style={{ marginLeft: '20px', height: '20px',
                        color: 'var(--on-surface-active, #0A0A0A)',
                        fontSize: '16px', fontStyle: 'normal',
                        fontWeight: '600', lineHeight: '150%'
            }}>
                포인트 상세정보
            </div>
            <div style={{ height: '24px' }}></div>



            <PointList
                point={100}
                date="23.08.16"
                text="칭찬 열람"
            ></PointList>
            <div style={{ height: '12px' }}></div>
            <PointList
                point={1000}
                date="23.08.16"
                text="칭찬 열람"
            ></PointList>
            <div style={{ height: '12px' }}></div>
            <PointList
                point={50}
                date="23.08.16"
                text="뭘 봐 임마!!"
            ></PointList>
            <div style={{ height: '12px' }}></div>
            <PointList
                point={5}
                date="23.08.16"
                text="멋있다~~~ 카꾸이!!"
            ></PointList>
            <div style={{ height: '12px' }}></div>
            <PointList
                point={100}
                date="23.08.16"
                text="착해서"
            ></PointList>
            <div style={{ height: '12px' }}></div>
            <PointList
                point={100}
                date="23.08.16"
                text="칭찬 열람"
            ></PointList>
            <div style={{ height: '12px' }}></div>
            
        </>
    );
}

export default PointDetail;