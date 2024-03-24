/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import { color } from "../styles/color";
import styled from "@emotion/styled";
import React from "react";
import { useState, useEffect } from "react";
import BlockNumber from "./BlockNumber";
import ZengaBlock from "./ZengaBlock";
import blueblockImg from "../images/blueblock.png";
import yellowblockImg from "../images/yellowblock.png";
import greenblockImg from "../images/greenblock.png";
import purpleblockImg from "../images/purpleblock.png";
import orangeblockImg from "../images/orangeblock.png";
import pinkblockImg from "../images/pinkblock.png";
import defaultblockImg from "../images/defaultblock.png";
import ZengaBigBlock from "./ZengaBigBlock";
import whaleImg from "../assets/images/whale_character7.png";
import { ReactComponent as DeleteImg } from "../images/delete.svg";
import { axiosInstance } from "../apis/axiosInstance";

interface ExplainProps {
  type: "Blue" | "Yellow" | "Green" | "Purple" | "Orange" | "Pink" | "Default";
  title: string;
  text: string;
}

interface ZengaProps {
  memberId: string | null | undefined;
}

const ExplainWrapper = ({ type, title, text }: ExplainProps) => {
  return (
    <div style={{ height: "36px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
        <img height={18} width={18} src={`/assets/ic-block${type}.svg`}></img>
        <div
          style={{
            height: "18px",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "160%",
            color: "var(--on-surface-default, rgba(10, 10, 10, 0.70))",
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          marginLeft: "24px",
          height: "18px",
          fontSize: "10px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "150%",
          color: "var(--on-surface-default, rgba(10, 10, 10, 0.70))",
        }}
      >
        {text}
      </div>
    </div>
  );
};

const ProfileZenga = ({ memberId }: ZengaProps) => {
  const [isBlock0, setIsBlock0] = useState<boolean>(false);
  const [helpboxState, setHelpboxState] = useState<boolean>(false);
  const [blockNum, setBlockNum] = useState<Array<number>>([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [blockList, setBlockList] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBlockListClick = () => {
    setHelpboxState(true);
  };

  const getBlockInfo = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await axiosInstance.get(`/members/${memberId}/blocks`).then((res) => {
        const blockData = res.data.data;
        if (blockData.blockInfoResponseDtoList.length === 0) {
          setIsBlock0(true);
        }
        let blockArray = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < blockData.blockCountResponseDtoList.length; i++) {
          if (blockData.blockCountResponseDtoList[i].blockType === "PINK") {
            blockArray[0] = blockData.blockCountResponseDtoList[i].count;
          } else if (
            blockData.blockCountResponseDtoList[i].blockType === "ORANGE"
          ) {
            blockArray[1] = blockData.blockCountResponseDtoList[i].count;
          } else if (
            blockData.blockCountResponseDtoList[i].blockType === "SKY_BLUE"
          ) {
            blockArray[2] = blockData.blockCountResponseDtoList[i].count;
          } else if (
            blockData.blockCountResponseDtoList[i].blockType === "LIGHT_GREEN"
          ) {
            blockArray[3] = blockData.blockCountResponseDtoList[i].count;
          } else if (
            blockData.blockCountResponseDtoList[i].blockType === "YELLOW"
          ) {
            blockArray[4] = blockData.blockCountResponseDtoList[i].count;
          } else if (
            blockData.blockCountResponseDtoList[i].blockType === "PURPLE"
          ) {
            blockArray[5] = blockData.blockCountResponseDtoList[i].count;
          } else if (
            blockData.blockCountResponseDtoList[i].blockType === "LIGHT_BROWN"
          ) {
            blockArray[6] = blockData.blockCountResponseDtoList[i].count;
          }
        }
        setBlockNum(blockArray);
        setBlockList(blockData.blockInfoResponseDtoList);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlockInfo();
  }, []);

  return (
    <>
      <div style={{ height: "16px" }}></div>
      <div
        onClick={handleBlockListClick}
        style={{
          margin: "0 20px 0 20px",
          height: "18px",
          padding: "13px 17px 13px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "8px",
          background: "var(--surface-surface, #FAFAFA)",
          cursor: "pointer",
        }}
      >
        <BlockNumber type='Pink' number={blockNum[0]}></BlockNumber>
        <BlockNumber type='Orange' number={blockNum[1]}></BlockNumber>
        <BlockNumber type='Blue' number={blockNum[2]}></BlockNumber>
        <BlockNumber type='Green' number={blockNum[3]}></BlockNumber>
        <BlockNumber type='Yellow' number={blockNum[4]}></BlockNumber>
        <BlockNumber type='Purple' number={blockNum[5]}></BlockNumber>
        <BlockNumber type='Default' number={blockNum[6]}></BlockNumber>
      </div>
      <div style={{ height: "50px" }}></div>
      {loading && (
        <div
          style={{
            position: "absolute",
            bottom: "calc((100% - 271px) / 2)",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "20",
          }}
        >
          <LoadingSpinner />
        </div>
      )}
      {isBlock0 ? (
        <>
          <div
            style={{
              display: "flex",
              height: "116px",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img width={72} height={72} src={whaleImg} />
            <div
              style={{
                color: "var(--on-surface-active, #0A0A0A)",
                textAlign: "center",
                fontSize: "16px",
                fontStyle: "normal",
                lineHeight: "150%",
              }}
            >
              <span style={{ fontWeight: "400" }}>아직&nbsp;</span>
              <span style={{ fontWeight: "600" }}>모은 블록</span>
              <span style={{ fontWeight: "400" }}>이 없어요</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              margin: "0 20px 0 20px",
              display: "flex",
              flexWrap: "wrap-reverse",
              justifyContent: "flex-start",
              rowGap: "5px",
              columnGap: "5px",
            }}
          >
            {blockList.map((item, index) => {
              let blockImg = defaultblockImg;
              let longBlockImg = yellowblockImg;
              let longBlockColor:
                | "Yellow"
                | "Blue"
                | "Green"
                | "Purple"
                | "Orange"
                | "Pink"
                | "Default" = "Yellow";
              if (item.blockType === "PINK") {
                blockImg = pinkblockImg;
                longBlockImg = blueblockImg;
                longBlockColor = "Blue";
              } else if (item.blockType === "ORANGE") {
                blockImg = orangeblockImg;
                longBlockImg = purpleblockImg;
                longBlockColor = "Purple";
              } else if (item.blockType === "SKY_BLUE") {
                blockImg = blueblockImg;
                longBlockImg = defaultblockImg;
                longBlockColor = "Default";
              } else if (item.blockType === "LIGHT_GREEN") {
                blockImg = greenblockImg;
                longBlockImg = pinkblockImg;
                longBlockColor = "Pink";
              } else if (item.blockType === "YELLOW") {
                blockImg = yellowblockImg;
                longBlockImg = orangeblockImg;
                longBlockColor = "Orange";
              } else if (item.blockType === "PURPLE") {
                blockImg = purpleblockImg;
                longBlockImg = greenblockImg;
                longBlockColor = "Green";
              }
              if (index % 3 !== 0 || index === 0) {
                return (
                  <>
                    <div style={{ width: "calc((100% - 10px) / 3)" }}>
                      <ZengaBlock
                        block={blockImg}
                        date={item.createdAt}
                        text={item.description}
                      />
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <ZengaBigBlock
                      block={longBlockImg}
                      color={longBlockColor}
                    ></ZengaBigBlock>
                    <div style={{ width: "calc((100% - 10px) / 3)" }}>
                      <ZengaBlock
                        block={blockImg}
                        date={item.createdAt}
                        text={item.description}
                      />
                    </div>
                  </>
                );
              }
            })}
          </div>
        </>
      )}
      {helpboxState && (
        <>
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              zIndex: "2",
              backgroundColor: "rgba(0, 0, 0, 0.50)",
            }}
          ></div>
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              width: "290px",
              height: "360px",
              transform: "translate(-50%, -50%)",
              background: "var(--surface-background, #FFF)",
              borderRadius: "16px",
              display: "flex",
              justifyContent: "center",
              zIndex: "3",
              alignItems: "center",
              maxWidth: "calc(500px - 85px)",
            }}
          >
            <DeleteImg
              onClick={() => setHelpboxState(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                cursor: "pointer",
              }}
            />
            <div
              style={{
                display: "flex",
                width: "228px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <ExplainWrapper
                type='Default'
                title='내가 한 칭찬'
                text='칭찬을 보낸 횟수에 따라 블록을 획득할 수 있어요'
              />
              <ExplainWrapper
                type='Pink'
                title='외적 칭찬'
                text='ex. 눈이 가장 매력적인 사람은?'
              />
              <ExplainWrapper
                type='Orange'
                title='성격 칭찬'
                text='ex. 고민을 제일 잘 들어줄 것 같은 사람은?'
              />
              <ExplainWrapper
                type='Yellow'
                title='도전/열정 칭찬'
                text='ex. 가장 자기계발에 힘쓰는 사람은?'
              />
              <ExplainWrapper
                type='Green'
                title='능력 칭찬'
                text='ex. 가장 말을 잘하는 사람은?'
              />
              <ExplainWrapper
                type='Blue'
                title='그 외 칭찬'
                text='ex. 하루만 이 사람으로 살아보고 싶은 사람은?'
              />
              <ExplainWrapper
                type='Purple'
                title='모임'
                text='모임 참여 횟수에 따라 블록을 획득할 수 있어요'
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileZenga;

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
