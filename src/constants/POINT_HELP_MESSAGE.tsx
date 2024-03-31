import styled from "@emotion/styled";
import { color } from "../styles/color";

const Container = styled.div`
  padding: 0 16px;

  p {
    text-align: left;
    font-size: 14px;
    font-weight: 400;
    color: ${color.onSurfaceDefault};
    word-break: keep-all;
  }

  p b {
    font-weight: 600;
  }

  hr {
    margin: 16px 0;
    height: 1px;
    border: 0;
    background: ${color.divider};
  }
`;

export const POINT_HELP_MESSAGE = (
  <Container>
    <p>
      <b>1. 젠가 포인트</b> : 젠가 포인트는 모든 채널 내에서 사용할 수 있는
      포인트로 모임 참여 및 칭찬 시 획득할 수 있으며, 칭찬 익명을 확인할 경우
      차감됩니다.
      <br />
      <br />· 칭찬 시: 50점 획득
      <br />· 모임 참여 시: 100점 획득 (채널당 1주 5회 제한)
      <br />· 모임 생성 시: 200점 획득 (채널당 1주 3회 제한)
      <br />· 칭찬 익명 확인 시: 200점 차감
    </p>
    <hr />
    <p>
      <b>2. 랭킹 포인트</b> : 이벤트 기간동안 현 채널 내에서 모임 참여 및 칭찬
      시 획득할 수 있으며, 랭킹 포인트가 높은 상위 1~3위에게는 특별한 보상이
      부여됩니다.
    </p>
  </Container>
);
