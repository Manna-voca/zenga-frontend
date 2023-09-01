/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { color } from "../styles/color";

const Timer: React.FC = () => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();

      let targetHour = Math.floor(currentHour / 4 + 1) * 4;

      if (targetHour !== undefined) {
        const targetTime = new Date(now);
        targetTime.setHours(targetHour, 0, 0, 0);

        const timeDifference = targetTime.getTime() - now.getTime();
        if (timeDifference <= 0) {
          clearInterval(interval);
          setRemainingTime(null);
          setIsLoading(false);
        } else {
          setRemainingTime(timeDifference);
          setIsLoading(false);
        }
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatHours = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / 1000 / 60 / 60);
    return `${hours.toString().padStart(2, "0")}`;
  };

  const formatMinutes = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 1000 / 60) % 60;
    return `${minutes.toString().padStart(2, "0")}`;
  };
  const formatSeconds = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    return `${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {isLoading ? (
        <LoadingDiv>
          <LoadingSpinner />
        </LoadingDiv> // 로딩 중일 때 보여주는 내용
      ) : remainingTime !== null ? (
        <TimerContainer>
          <TimerWrapper>
            <TimerNumberDiv>{formatHours(remainingTime)}</TimerNumberDiv>
            <span css={timerSpanStyle}>시간</span>
          </TimerWrapper>
          <TimerWrapper>
            <TimerNumberDiv>{formatMinutes(remainingTime)}</TimerNumberDiv>
            <span css={timerSpanStyle}>분</span>
          </TimerWrapper>
          <TimerWrapper>
            <TimerNumberDiv style={{ color: `${color.primary300}` }}>
              {formatSeconds(remainingTime)}
            </TimerNumberDiv>
            <span css={timerSpanStyle}>초</span>
          </TimerWrapper>
        </TimerContainer>
      ) : (
        <p style={{ height: "113px" }}>
          새로 고침하면 새로운 칭찬을 볼 수 있어요 !
        </p>
      )}
    </div>
  );
};

export default Timer;

const TimerContainer = styled.div`
  width: 262px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
`;
const TimerNumberDiv = styled.div`
  width: 74px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${color.primary50};
  color: ${color.primary600};
  font-size: 24px;
  font-weight: 600;
  line-height: 1.5;
`;
const timerSpanStyle = css`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
`;
const LoadingDiv = styled.div`
  height: 113px;
  display: flex:
  align-items: center;
`;
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
