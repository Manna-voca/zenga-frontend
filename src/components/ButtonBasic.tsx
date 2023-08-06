import styled from "@emotion/styled";
import { FC } from "react";
import { color } from "../styles/color";

interface ButtonBasicProps {
  disable: boolean;
  innerText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonBasic: FC<ButtonBasicProps> = ({
  disable,
  innerText,
  onClick,
}: ButtonBasicProps) => {
  return (
    <MyButton
      onClick={onClick}
      disabled={disable}
      style={{
        backgroundColor: disable ? "" : `${color.primary500}`,
        color: disable ? "" : `${color.onPrimaryActive}`,
        cursor: disable ? "" : "pointer",
      }}
    >
      {innerText}
    </MyButton>
  );
};

const MyButton = styled.button`
  width: 100%;
  padding: 15px 20px;
  height: 47px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color.surface};
  border: none;
  border-radius: 8px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  color: ${color.onSurfaceDefault};
`;

export default ButtonBasic;
