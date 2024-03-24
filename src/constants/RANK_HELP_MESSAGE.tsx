import styled from "@emotion/styled";
import { color } from "../styles/color";

const Container = styled.div`
  padding: 0 16px;

  font-size: 14px;
  line-height: 150%;

  h2 {
    font-weight: 700;
    color: ${color.onSurfaceDefault};
  }

  p {
    font-weight: 400;
    color: ${color.onSurfaceDefault};
    word-break: keep-all;
  }
`;

export const RANK_HELP_MESSAGE = (
  <Container>
    <h2>1. 랭킹 시스템</h2>
    <p>
      실시간 랭킹에는 상위 20명까지 노출되며, 이벤트 종료 시점 기준 실시간 랭킹
      포인트 상위 1~3위에게는 특별한 보상을 제공합니다.
    </p>
    <br />
    <h2>2. 랭킹 포인트 획득 방법</h2>
    <p>
      (1) 모임을 생성하거나 참여하여 카드 만들기까지 완료하는 경우 랭킹 포인트
      100점을 획득합니다. <br />
      (2) 칭찬 1회 보내기 완료 시 랭킹 포인트 50점을 획득합니다.
    </p>
    <br />
    <h2>3.랭킹 주의사항</h2>
    <p>랭킹 포인트는 현 채널 내에서 획득한 포인트만 반영됩니다.</p>
  </Container>
);
