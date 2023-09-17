import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { ReactComponent as PointsImg } from "../images/points.svg";
import PointList from "../components/PointList";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

const PointDetail = () => {
    dayjs.extend(relativeTime);
    dayjs.locale('ko');
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };

    const [totalPoint, setTotalPoint] = useState<number>();
    const [pointList, setPointList] = useState<Array<any>>([]);

    const getTotalPoint = async () => {
        await axios.get(`${SERVER_URL}/point/total`, CONFIG).then((res) => {
            setTotalPoint(res.data.data.point);
        })
    };

    const getPointInfo = async () => {
        await axios.get(`${SERVER_URL}/point/info`, CONFIG).then((res) => {
            setPointList(res.data.data.content);
        })
    };

    useEffect(() => {
        getTotalPoint();
        getPointInfo();
    }, []);

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
                    {totalPoint}
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
            {pointList.map((item, index) => {
                const createdAt = dayjs(item.createdAt);
                const formattedCreatedAt = createdAt.format('YY.MM.DD');
                return(
                    <>
                        <PointList
                            key={index}
                            point={item.point}
                            date={formattedCreatedAt}
                            text={item.description}
                        ></PointList>
                        <div style={{ height: '12px' }}></div>
                    </>
                );
            })}
        </>
    );
}

export default PointDetail;