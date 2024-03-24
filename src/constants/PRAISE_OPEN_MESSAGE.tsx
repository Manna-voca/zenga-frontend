import styled from "@emotion/styled";
import { color } from "../styles/color";
import zengaIcon from "../images/points.svg";
import { useEffect, useState } from "react";
import { fetchZengaPoint } from "../apis/zengaPoint";

const Container = styled.div`
  padding: 0 16px;

  p {
    font-size: 14px;
    font-weight: 400;
    color: ${color.onSurfaceDefault};
    word-break: keep-all;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 16px;
      height: 16px;
    }

    b {
      font-size: 14px;
      font-weight: 600;
      color: ${color.primary500};
    }
  }
`;

export const PRAISE_OPEN_MESSAGE = () => {
  const [currentZengaPoint, setCurrentZengaPoint] = useState<number>(0);

  useEffect(() => {
    fetchZengaPoint().then((res) => {
      setCurrentZengaPoint(res);
    });
  }, []);

  return (
    <Container>
      <p>
        <img src={zengaIcon} alt='' />
        <b>&nbsp;200&nbsp;</b>사용 시 확인할 수 있어요
      </p>
      <p>
        사용 가능 포인트 :&nbsp; <img src={zengaIcon} alt='' /> &nbsp;
        <b>{currentZengaPoint}</b>
      </p>
    </Container>
  );
};
