import styled from "@emotion/styled";
import { FC } from "react";
import { color } from "../styles/color";

interface ButtonBasicProps {
  innerText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disable?: boolean;
  btnColor?: "#FDB639" | "#1F94FF" | "FAFAFA";
}

const ButtonBasic: FC<ButtonBasicProps> = ({
  disable,
  innerText,
  onClick,
  btnColor,
}: ButtonBasicProps) => {
  if (disable !== undefined && btnColor !== undefined) {
    console.error("disable 속성이 필요없는 버튼에서만 btnColor를 입력하세요");
    return null;
  }

  return (
    <MyButton
      onClick={onClick}
      disabled={disable}
      style={{
        backgroundColor: 
        btnColor ? btnColor
          : disable
          ? `${color.surface}`
          : `${color.primary500}`,
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
