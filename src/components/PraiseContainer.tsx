import styled from "@emotion/styled";
import React from "react";
import PraiseWrapper from "./PraiseWrapper";
import ex from "../assets/images/profile-1.png";

interface OwnProps {
  isGetNotPost: boolean;
}

interface PraiseProps {
  content: string;
  image?: string;
  name: string;
  type: "Blue" | "Yellow" | "Green" | "Purple" | "Orange" | "Pink" | "Default";
}

const PraiseContainer = ({ isGetNotPost }: OwnProps) => {
  const getPraiseDummy: Array<PraiseProps> = [
    {
      content: "항상 일순위로 먼저 도전할 것 같은 사람은? ",
      name: "익명",
      type: "Yellow",
    },
    {
      content: "가장 꺾이지 않는 마음을 가진 사람은? ",
      name: "익명",
      type: "Blue",
    },
    {
      content: "시험기간 밤샘을 가장 잘 할 것 같은 사람은? ",
      name: "익명",
      type: "Green",
    },
    {
      content: "우리 동아리에서 가장 눈치가 빠른 사람은? ",
      name: "익명",
      type: "Purple",
    },
    {
      content: "시험기간 밤샘 카공 같이 하고 싶은 사람은? ",
      name: "익명",
      type: "Orange",
    },
  ];
  const postPraiseDummy: Array<PraiseProps> = [
    {
      content: "항상 일순위로 먼저 도전할 것 같은 사람은? ",
      image: ex,
      name: "윤석민",
      type: "Yellow",
    },
    {
      content: "가장 꺾이지 않는 마음을 가진 사람은? ",
      image: ex,
      name: "김민근",
      type: "Blue",
    },
    {
      content: "시험기간 밤샘을 가장 잘 할 것 같은 사람은? ",
      image: ex,
      name: "박세원",
      type: "Green",
    },
    {
      content: "우리 동아리에서 가장 눈치가 빠른 사람은? ",
      image: ex,
      name: "송현섭",
      type: "Purple",
    },
    {
      content: "시험기간 밤샘 카공 같이 하고 싶은 사람은? ",
      image: ex,
      name: "유승민",
      type: "Orange",
    },
  ];
  const praiseDummy = isGetNotPost ? getPraiseDummy : postPraiseDummy;

  return (
    <PraiseContainerDiv>
      {praiseDummy.map((praise, index) => {
        return (
          <PraiseWrapper
            key={index}
            isGetNotPost={isGetNotPost}
            content={praise.content}
            image={praise.image}
            name={praise.name}
            type={praise.type}
          />
        );
      })}
    </PraiseContainerDiv>
  );
};

export default PraiseContainer;

const PraiseContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
  margin-top: 20px;
`;
