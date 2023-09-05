/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { color } from "../styles/color";
import smallWhale from "../assets/images/smallWhale.png";
import CircularImage from "./CircularImage";

interface PraiseProps {
  isGetNotPost: boolean;
  content: string;
  image?: string;
  name: string;
  type: "Blue" | "Yellow" | "Green" | "Purple" | "Orange" | "Pink" | "Default";
}

const PraiseWrapper = ({
  isGetNotPost,
  content,
  image,
  name,
  type,
}: PraiseProps) => {
  const blockType = `block${type}`;
  const blockImagePath = `/assets/ic-${blockType}.svg`;
  const imageNameStyle = isGetNotPost ? getImageNameStyle : postImageNameStyle;
  const profileImagePath = image ? image : smallWhale;

  return (
    <PraiseWrapperDiv>
      <img width="21px" height="21px" src={blockImagePath} alt="" />
      <PraiseContentDiv>
        <B>{content}</B>질문에 나를 선택한 사람은
      </PraiseContentDiv>
      <div css={imageNameStyle}>
        <CircularImage size="24" image={profileImagePath} />
        {name}
      </div>
    </PraiseWrapperDiv>
  );
};

export default PraiseWrapper;

const PraiseWrapperDiv = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 300px;
  height: 88px;
  padding: 10px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: ${color.surface};
  gap: 6px;
`;
const PraiseContentDiv = styled.p`
  color: ${color.onSurfaceDefault};
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`;
const B = styled.b`
  color: ${color.onSurfaceActive};
  font-weight: 500;
`;

const getImageNameStyle = css`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  padding: 2px 5px 2px 2px;
  align-items: center;
  border: 1px solid ${color.outline};
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  gap: 6px;
  color: ${color.onSurfaceDefault};
`;
const postImageNameStyle = css`
  position: absolute;
  bottom: 9px;
  right: 9px;
  display: flex;
  padding: 2px 5px 2px 2px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  gap: 6px;
  color: ${color.onSurfaceDefault};
`;
