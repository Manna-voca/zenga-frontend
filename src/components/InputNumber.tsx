/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { FC } from "react";
import { color } from "../styles/color";
import { typography } from "../styles/typography";

interface InputNumberProps {
  isNecessary: boolean;
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputNumber: FC<InputNumberProps> = ({
  isNecessary,
  label,
  placeholder,
  value,
  onChange,
}: InputNumberProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = parseInt(event.target.value, 10);

    if (isNaN(inputValue)) {
      inputValue = 0; // 숫자가 아닌 입력을 0으로 처리
    }

    if (inputValue > 20) {
      inputValue = 20; // 20 이상의 값은 20으로 제한
    }

    onChange({
      ...event,
      target: {
        ...event.target,
        value: inputValue.toString(), // 변경된 값을 문자열로 변환하여 전달
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2px",
          alignItems: "center",
          height: "21px",
        }}
      >
        <div
          style={{
            ...typography.body2Medium,
            color: `${color.onSurfaceDefault}`,
          }}
        >
          {label}
        </div>
        <div
          style={{
            display: isNecessary ? "" : "none",
            color: `${color.primary500}`,
            height: "16px",
            fontSize: "12px",
            fontWeight: "500",
            lineHeight: "100%",
          }}
        >
          *
        </div>
      </div>
      <input
        type="number"
        placeholder={placeholder}
        css={inputTextStyle}
        style={{ ...typography.body2Medium }}
        value={value}
        onChange={handleInputChange}
        min={0}
        max={20}
      />
      <div
        style={{
          display: isNaN(value as unknown as number) ? "" : "none",
          ...typography.body3Regular,
          color: `${color.error}`,
          height: "30px",
          lineHeight: "30px",
        }}
      >
        참여 인원(숫자)만 입력해 주세요.
      </div>
    </div>
  );
};

const inputTextStyle = css`
  font-family: Pretendard;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  padding: 10px 16px;
  border: 1px solid ${color.outline};
  border-radius: 8px;
  color: ${color.onSurfaceActive};
  &::placeholder {
    color: ${color.onSurfaceMuted};
  }
  &:focus {
    border-color: ${color.primary500};
  }
`;

export default InputNumber;
