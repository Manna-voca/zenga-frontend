/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { typography } from "../styles/typography";
import { color } from "../styles/color";

interface TextFieldProps {
  label: string;
  placeholder: string;
  maxLength?: number;
  value: string;
  isNecessary?: boolean;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextField: FC<TextFieldProps> = ({
  label,
  placeholder,
  maxLength,
  value,
  onChange,
  isNecessary,
}: TextFieldProps) => {
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
          ...typography.body2Medium,
          color: `${color.onSurfaceDefault}`,
          display: "flex",
          alignItems: "center",
          height: "21px",
          gap: "2px",
        }}
      >
        <div>{label}</div>
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
      <textarea
        css={TextFieldStyle}
        placeholder={placeholder}
        style={{ ...typography.body2Medium }}
        value={value}
        onChange={onChange}
        maxLength={maxLength ? maxLength : undefined}
      />
      {maxLength && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            color: `${color.onSurfaceMuted}`,
            ...typography.body3Regular,
          }}
        >
          {value.length > maxLength ? maxLength : value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default TextField;

const TextFieldStyle = css`
  font-family: Pretendard;
  width: 100%;
  height: 146px;
  resize: none;
  box-sizing: border-box;
  padding: 10px 16px;
  border: 1px solid ${color.outline};
  border-radius: 8px;
  background-color: ${color.input};
  color: ${color.onSurfaceActive};
  &::placeholder {
    color: ${color.onSurfaceMuted};
  }
  &:focus {
    border-color: ${color.primary500};
  }
`;
