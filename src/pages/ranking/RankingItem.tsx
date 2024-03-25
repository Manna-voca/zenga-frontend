import styled from "@emotion/styled";
import { RankProfileImage } from "./RankingProfileImage";
import { color } from "../../styles/color";
import RankIcon from "../../images/rankPointIcon.svg";
import { RankingType } from "../../apis/ranking";
import { 세자리콤마추가 } from "../../utils/addCommas";
import { useNavigate, useParams } from "react-router-dom";

export function RankingItem({
  memberId,
  rank,
  userProfileImage,
  nickname,
  point,
}: RankingType) {
  const navigate = useNavigate();
  const { channelCode } = useParams();
  const myMemberId = Number(localStorage.getItem("memberId"));
  const navigateToMyPage = () => {
    if (memberId === myMemberId) {
      navigate(`/${channelCode}/mypage`);
    } else {
      navigate(`/${channelCode}/memberpage/${memberId}`);
    }
  };

  return (
    <ItemContainer onClick={navigateToMyPage}>
      <div className='item-left-section'>
        <h4>{rank}</h4>
        <RankProfileImage rank={rank} image={userProfileImage} />
        <span>{nickname}</span>
      </div>
      <div className='item-right-section'>
        <img src={RankIcon} alt='R' />
        <span>{세자리콤마추가(point)}</span>
      </div>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  padding: 12px 20px;

  border-bottom: 0.5px solid ${color.outline};

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  .item-left-section {
    display: flex;
    align-items: center;
    gap: 16px;

    h4 {
      display: inline-block;
      width: 20px;

      color: ${color.onSurfaceDefault};
      font-size: 16px;
      font-weight: 700;
    }

    span {
      color: ${color.onSurfaceActive};
      font-size: 16px;
      font-weight: 400;
    }
  }

  .item-right-section {
    display: flex;
    align-items: center;
    gap: 6px;

    span {
      color: ${color.onSurfaceDefault};
      font-size: 16px;
      font-weight: 500;
    }
  }
`;
