/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { FC } from "react";
import { color } from "../styles/color";
import { typography } from "../styles/typography";

interface InputTextProps {
  isNecessary: boolean;
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: FC<InputTextProps> = ({
  isNecessary,
  label,
  placeholder,
  value,
  onChange,
}: InputTextProps) => {
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
        type="text"
        placeholder={placeholder}
        css={inputTextStyle}
        style={{ ...typography.body2Medium }}
        value={value}
        onChange={onChange}
      />
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

export default InputText;
