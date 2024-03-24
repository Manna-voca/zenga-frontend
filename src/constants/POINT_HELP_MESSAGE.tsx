import styled from "@emotion/styled";
import { color } from "../styles/color";

const Container = styled.div`
  padding: 0 16px;

  p {
    font-size: 14px;
    font-weight: 400;
    color: ${color.onSurfaceDefault};
    word-break: keep-all;
  }
`;

export const POINT_HELP_MESSAGE = (
  <Container>
    <p>
      1. 젠가 포인트 : 젠가 포인트는 모든 채널 내에서 사용할 수 있는 포인트로
      모임 참여 및 칭찬 시 획득할 수 있으며, 칭찬 익명을 확인할 경우 차감됩니다.
    </p>
    <br />
    <p>
      2. 랭킹 포인트 : 이벤트 기간동안 현 채널 내에서 모임 참여 및 칭찬 시
      획득할 수 있으며, 랭킹 포인트가 높은 상위 1~3위에게는 특별한 보상이
      부여됩니다.
    </p>
  </Container>
);
