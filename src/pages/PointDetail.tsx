/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import { color } from "../styles/color";
import styled from "@emotion/styled";
import React, { useState, useEffect, useRef } from "react";
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

    const [loading, setLoading] = useState<boolean>(false);

    const [totalPoint, setTotalPoint] = useState<number>();
    const [pointList, setPointList] = useState<Array<any>>([]);

    const [hasNext, setHasNext] = useState<boolean>(true);
    const [pointId, setPointId] = useState<number>();

    const containerRef = useRef<HTMLDivElement>(null);

    const getTotalPoint = async () => {
        await axios.get(`${SERVER_URL}/point/total`, CONFIG).then((res) => {
            setTotalPoint(res.data.data.point);
        }).catch((err) => console.error(err));
    };

    const getPointInfo = async () => {
        if(loading) return;
        try{
            const uri = `${SERVER_URL}/point/info` +
                        (pointId ? `?pointId=${pointId}&size=15` : "?size=15");
            if(hasNext === false) return;
            setLoading(true);
            await axios.get(`${uri}`, CONFIG).then((res) => {
                setPointList((prev) => [...prev, ...res.data.data.content]);
                if(res.data.data.hasNext === false){
                    setHasNext(false);
                }
                setPointId(Number(res.data.data.content[res.data.data.content.length-1].pointId));
            })
        } catch(err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if(
            containerRef.current &&
            containerRef.current.scrollHeight - containerRef.current.scrollTop <=
                containerRef.current.clientHeight + 1
        ) {
            getPointInfo();
        }
    }

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
            {loading && (
                <div
                    style={{ position: "absolute", bottom: "calc((100% - 200px) / 2)", left: "50%",
                            transform: "translate(-50%, -50%)", display: "flex",
                            justifyContent: "center", alignItems: "center",
                            zIndex: "20",
                }}>
                    <LoadingSpinner />
                </div>
            )}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                style={{ display: 'flex', flexDirection: 'column',
                        height: 'calc(100vh - 205px)', maxHeight: 'calc(100vh - 205px)',
                        overflowY: 'scroll', position: 'relative', gap: '12px'
            }}>
                {pointList.map((item, index) => {
                    const createdAt = dayjs(item.createdAt);
                    const formattedCreatedAt = createdAt.format('YY.MM.DD');
                    return(
                        <div>
                            
                            <PointList
                                key={index}
                                point={item.point}
                                date={formattedCreatedAt}
                                text={item.description}
                            ></PointList>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default PointDetail;


const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid ${color.surface};
  border-top-color: ${color.primary300};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;