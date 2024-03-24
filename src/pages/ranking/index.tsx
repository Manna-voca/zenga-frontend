import styled from "@emotion/styled";
import Navbar from "../../components/Navbar";
import QuestionIcon from "../../assets/icons/ic-question-mark.png";
import RankIcon from "../../images/rankPointIcon.svg";
import { useEffect, useState } from "react";
import { color } from "../../styles/color";
import { RankingItem } from "./RankingItem";
import { RankProfileImage } from "./RankingProfileImage";
import Popup1 from "../../components/Popup1";
import { RANK_HELP_MESSAGE } from "../../constants/RANK_HELP_MESSAGE";
import {
  RankingType,
  fetchEntireRankInfo,
  fetchMyRankInfo,
} from "../../apis/ranking";

const Ranking = () => {
  const [helpToastState, setHelpToastState] = useState<boolean>(false);
  const [myRankInfo, setMyRankInfo] = useState<RankingType>({
    memberId: 0,
    nickname: "",
    rank: 0,
    userProfileImage: "",
    point: 0,
  });
  const [entireRankInfo, setEntireRankInfo] = useState<RankingType[]>([]);

  useEffect(() => {
    const data = fetchMyRankInfo();
    const entireData = fetchEntireRankInfo();

    data.then((res) => {
      setMyRankInfo(res);
    });

    entireData.then((res) => {
      setEntireRankInfo(res);
    });
  }, []);

  return (
    <>
      {helpToastState && (
        <Popup1
          title='랭킹 도움말'
          btnText='확인'
          text={RANK_HELP_MESSAGE}
          func={() => setHelpToastState(false)}
        />
      )}
      <Title>
        <h1>실시간 랭킹</h1>
        <img
          src={QuestionIcon}
          alt='랭킹 도움말'
          onClick={() => setHelpToastState(true)}
        />
      </Title>
      <RankingList>
        {entireRankInfo.map((item) => {
          return (
            <RankingItem
              key={item.memberId}
              memberId={item.memberId}
              nickname={item.nickname}
              rank={item.rank}
              userProfileImage={item.userProfileImage}
              point={item.point}
            />
          );
        })}
      </RankingList>
      <MyRankInfo>
        <div className='item-left-section'>
          <h4>{myRankInfo.point === 0 ? "-" : myRankInfo.rank}</h4>
          <RankProfileImage
            rank={myRankInfo.point === 0 ? 10 : myRankInfo.rank}
            image={myRankInfo.userProfileImage}
          />
          <span>{myRankInfo.nickname}</span>
        </div>
        <div className='item-right-section'>
          <img src={RankIcon} alt='Rank Icon' />
          <span>{myRankInfo.point}</span>
        </div>
      </MyRankInfo>
      <Navbar state={3} />
    </>
  );
};

export default Ranking;

const Title = styled.div`
  position: sticky;
  top: 44px;
  background-color: white;
  z-index: 1;

  padding: 16px 0 16px 20px;

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
`;

const RankingList = styled.div`
  padding-bottom: 57px;
`;

const MyRankInfo = styled.div`
  position: fixed;
  bottom: 62px;
  transform: translate(5px);

  width: calc(100% - 10px);
  max-width: 490px;
  height: 60px;
  padding: 12px 15px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;

  background-color: ${color.onSurfaceDefault};

  color: white;

  .item-left-section {
    display: flex;
    align-items: center;
    gap: 16px;

    h4 {
      display: inline-block;
      width: 20px;

      font-size: 16px;
      font-weight: 700;
    }

    span {
      font-size: 16px;
      font-weight: 400;
    }
  }

  .item-right-section {
    display: flex;
    align-items: center;
    gap: 6px;

    span {
      font-size: 16px;
      font-weight: 500;
    }
  }
`;
