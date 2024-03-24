/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import { color } from "../styles/color";
import styled from "@emotion/styled";
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { ReactComponent as PointsImg } from "../images/points.svg";
import { ReactComponent as RankPointIcon } from "../images/rankPointIcon.svg";
import QuestionIcon from "../assets/icons/ic-question-mark.png";
import PointDetailItem from "../components/PointList";
import { axiosInstance } from "../apis/axiosInstance";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Popup1 from "../components/Popup1";
import { POINT_HELP_MESSAGE } from "../constants/POINT_HELP_MESSAGE";
import {
  RankPointHistoryType,
  fetchMyRankInfo,
  fetchMyRankPointHistory,
} from "../apis/ranking";
import { 세자리콤마추가 } from "../utils/addCommas";

const PointDetail = () => {
  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  const [loading, setLoading] = useState<boolean>(false);
  const [helpToastState, setHelpToastState] = useState<boolean>(false);
  const [zengaPoint, setZengaPoint] = useState<number>(0);
  const [rankPoint, setRankPoint] = useState<number>(0);
  const [pointList, setPointList] = useState<Array<any>>([]);
  const [rankHistoryList, setRankHistoryList] = useState<
    Array<RankPointHistoryType>
  >([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [pointId, setPointId] = useState<number>();
  const [selectedTab, setSelectedTab] = useState<string>("zenga");
  const containerRef = useRef<HTMLDivElement>(null);

  const getTotalPoint = async () => {
    await axiosInstance
      .get(`/point/total`)
      .then((res) => {
        setZengaPoint(res.data.data.point);
      })
      .catch((err) => console.error(err));
  };

  const getPointInfo = async () => {
    if (loading) return;
    try {
      const uri =
        `/point/info` + (pointId ? `?pointId=${pointId}&size=15` : "?size=15");
      if (hasNext === false) return;
      setLoading(true);
      await axiosInstance.get(`${uri}`).then((res) => {
        setPointList((prev) => [...prev, ...res.data.data.content]);
        if (res.data.data.hasNext === false) {
          setHasNext(false);
        }
        setPointId(
          Number(
            res.data.data.content[res.data.data.content.length - 1].pointId
          )
        );
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollHeight - containerRef.current.scrollTop <=
        containerRef.current.clientHeight + 1
    ) {
      getPointInfo();
    }
  };

  useEffect(() => {
    getTotalPoint();
    const rankPoint = fetchMyRankInfo();
    rankPoint.then((res) => {
      setRankPoint(res.point);
    });
    getPointInfo();
    const rankPointHistory = fetchMyRankPointHistory();
    rankPointHistory.then((res) => {
      setRankHistoryList(res);
    });
  }, []);

  return (
    <>
      {helpToastState && (
        <Popup1
          title='포인트 안내사항'
          text={POINT_HELP_MESSAGE}
          btnText='확인'
          func={() => setHelpToastState(false)}
        />
      )}
      <Header type='back' text='내 포인트' />
      <PointViewContainer>
        <div className='point-help-div'>
          <h1>포인트</h1>
          <img
            src={QuestionIcon}
            alt='포인트 도움말'
            onClick={() => setHelpToastState(true)}
          />
        </div>

        <PointViewElementWrapper id='zenga-point'>
          <div className='point-name'>
            <PointsImg height={21} width={21} />
            젠가 포인트
          </div>
          <span>{세자리콤마추가(zengaPoint)}</span>
        </PointViewElementWrapper>

        <PointViewElementWrapper id='ranking-point'>
          <div className='point-name'>
            <RankPointIcon height={21} width={21} />
            랭킹 포인트
          </div>
          <span>{세자리콤마추가(rankPoint)}</span>
        </PointViewElementWrapper>
      </PointViewContainer>

      <PointDetailContainer>
        <DetailTab>
          <Tab
            isSelected={selectedTab === "zenga"}
            onClick={() => setSelectedTab("zenga")}
          >
            젠가 포인트
          </Tab>
          <Tab
            isSelected={selectedTab === "ranking"}
            onClick={() => setSelectedTab("ranking")}
          >
            랭킹 포인트
          </Tab>
        </DetailTab>
        {loading && (
          <LoadingBg>
            <LoadingSpinner />
          </LoadingBg>
        )}
        <DetailList
          ref={containerRef}
          onScroll={selectedTab === "zenga" ? handleScroll : undefined}
        >
          {selectedTab === "zenga"
            ? pointList.map((item) => {
                const createdAt = dayjs(item.createdAt);
                const formattedCreatedAt = createdAt.format("YY.MM.DD");
                return (
                  <PointDetailItem
                    key={item.pointId}
                    point={item.point}
                    date={formattedCreatedAt}
                    text={item.description}
                  />
                );
              })
            : rankHistoryList.map((item, index) => {
                return (
                  <PointDetailItem
                    key={index}
                    point={item.point}
                    date={item.date}
                    text={item.contents}
                  />
                );
              })}
        </DetailList>
      </PointDetailContainer>
    </>
  );
};

export default PointDetail;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingBg = styled.div`
  position: absolute;
  z-index: 20;
  left: 50%;
  bottom: calc((100% - 200px) / 2);
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid ${color.surface};
  border-top-color: ${color.primary300};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const PointViewContainer = styled.div`
  margin: 16px 20px 32px 20px;

  .point-help-div {
    margin-bottom: 12px;

    display: flex;
    align-items: center;
    gap: 6px;

    h1 {
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
    }
    img {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }

  #zenga-point {
    margin-bottom: 8px;
  }
`;

const PointViewElementWrapper = styled.div`
  height: 60px;
  padding: 0 20px;

  border-radius: 8px;
  background-color: #fafafa;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: rgba(10, 10, 10, 0.7);
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;

  .point-name {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const PointDetailContainer = styled.div``;

const DetailTab = styled.div`
  width: 100%;
  height: 48px;
  box-sizing: border-box;

  margin-bottom: 20px;

  display: flex;
`;

const Tab = styled.div<{ isSelected: boolean }>`
  flex: 1;

  border-bottom: ${({ isSelected }) =>
    isSelected
      ? `2px solid ${color.onSurfaceActive}`
      : `1px solid ${color.divider}`};

  color: ${({ isSelected }) =>
    isSelected ? color.onSurfaceActive : color.onSurfaceMuted};
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  line-height: 48px;
  text-align: center;

  cursor: pointer;
`;

const DetailList = styled.div`
  position: relative;

  max-height: calc(100vh - 339px);
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;
