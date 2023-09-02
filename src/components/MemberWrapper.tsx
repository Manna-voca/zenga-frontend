/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import CircularImage from "./CircularImage";
import { color } from "../styles/color";
import { useNavigate } from "react-router-dom";

interface OwnProps {
  name: string;
  image: string;
  isChannelAdmin: boolean;
}

const MemberWrapper = ({ name, image, isChannelAdmin }: OwnProps) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate('/memberpage/1')}>
      <CircularImage
        image={image}
        size="36"
        isChannelAdmin={isChannelAdmin ? isChannelAdmin : undefined}
      />
      <MemberName>{name}</MemberName>
    </Container>
  );
};

export default MemberWrapper;

const Container = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 20px;
  gap: 24px;
  align-items: center;
  border-bottom: 0.5px solid ${color.outline};
  cursor: pointer;
`;

const MemberName = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: ${color.onSurfaceActive};
`;
