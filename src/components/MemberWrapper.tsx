/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import CircularImage from "./CircularImage";
import { color } from "../styles/color";
import { useNavigate, useParams } from "react-router-dom";

interface OwnProps {
  name: string;
  id: number;
  image: string;
  isChannelAdmin: boolean;
}

const MemberWrapper = ({ name, image, id, isChannelAdmin }: OwnProps) => {
  const navigate = useNavigate();
  const { channelCode } = useParams();

  const handleWrapperClick = () => {
    if(`${id}` === localStorage.getItem("memberId")){
      navigate(`/${channelCode}/mypage`);
    }
    else{
      navigate(`/${channelCode}/memberpage/${id}`);
    }
  };

  return (
  <Container onClick={handleWrapperClick}>
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
