/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { ReactComponent as MoreArrowImg } from "../images/moreArrow.svg";
import { ReactComponent as LessArrowImg } from "../images/lessArrow.svg";

interface Props {
  date: string;
  title: string;
  text: string;
  image: string | ArrayBuffer | null | undefined;
}

const Card = ({ date, title, text, image }: Props) => {
  const textRef = useRef<HTMLDivElement>(null);

  const [isAllText, setIsAllText] = useState<boolean>(false);
  const [moreBtnState, setMoreBtnState] = useState<boolean>(false);

  useEffect(() => {
    console.log(textRef.current?.scrollHeight);
    if (
      textRef.current?.scrollHeight !== undefined &&
      textRef.current?.scrollHeight > 42
    ) {
      console.log(textRef.current?.scrollHeight);
      setMoreBtnState(true);
    }
  }, []);

  return (
    <>
      <div
        style={{
          height: "535px",
          width: "100%",
          borderRadius: "10px",
          backgroundImage: `url(${image})`,
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            height: "17px",
            lineHeight: "150%",
            color: "var(--on-primary-active, #FCFCFC)",
            textShadow: "0px 0px 2px rgba(0, 0, 0, 0.10)",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            backgroundColor: "rgba(10, 10, 10, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "22.5px",
            padding: "5px 10px",
          }}
        >
          {date}
        </div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            bottom: "0",
            background:
              "linear-gradient(rgba(38, 38,38, 0) 0%, rgba(8,8,8,1) 100%)",
            padding: "20px 0",
          }}
        >
          <div
            style={{
              padding: "0 20px 0 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "4px",
              color: "#FCFCFC",
            }}
          >
            <div
              style={{
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "21px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "150%",
                wordBreak: "break-all",
              }}
            >
              {title}
            </div>
            <div ref={textRef} css={isAllText ? allText : ellipsisText}>
              {text}
            </div>
            {moreBtnState && (
              <div
                onClick={() => setIsAllText((current) => !current)}
                style={{
                  cursor: "pointer",
                  display: "inline-flex",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "150%",
                  alignItems: "center",
                  width: "64px",
                }}
              >
                {isAllText ? "줄이기" : "더보기"}
                {isAllText ? (
                  <LessArrowImg height={21} width={21} />
                ) : (
                  <MoreArrowImg height={21} width={21} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

const allText = css`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  flex-basis: 40px;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
`;

const ellipsisText = css`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  height: 42px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;
