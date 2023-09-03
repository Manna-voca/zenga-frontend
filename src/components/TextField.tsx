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
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextField: FC<TextFieldProps> = ({
  label,
  placeholder,
  maxLength,
  value,
  onChange,
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
        }}
      >
        <div>{label}</div>
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
