/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import react, { FC, useState } from "react";
import { color } from "../styles/color";
import { typography } from "../styles/typography";
import icDownArrowMuted from "../assets/icons/ic-downArrowMuted.svg";
import icDownArrowActive from "../assets/icons/ic-downArrowActive.svg";
import icUpArrow from "../assets/icons/ic-upArrow.svg";

interface DropDownProps {
  isNecessary: boolean;
  label: string;
  placeholder: string;
  dropdownMenu: string[];
  onChange: react.Dispatch<react.SetStateAction<string>>;
  value: string;
}

const DropDown: FC<DropDownProps> = ({
  isNecessary,
  label,
  placeholder,
  dropdownMenu,
  onChange,
  value,
}: DropDownProps) => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
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
      <div
        css={valueDivStyle}
        style={{
          ...typography.body2Medium,
          color: value ? `${color.onSurfaceActive}` : "",
          borderColor: isSelecting ? `${color.primary500}` : "",
          borderRadius: isSelecting ? "8px 8px 0px 0px" : "",
        }}
      >
        <div
          style={{ cursor: "pointer", flexGrow: "1" }}
          onClick={() => setIsSelecting((prev) => !prev)}
        >
          {value ? value : placeholder}
        </div>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => setIsSelecting((prev) => !prev)}
          src={
            isSelecting
              ? icUpArrow
              : value
              ? icDownArrowActive
              : icDownArrowMuted
          }
          alt=""
        />
        <div
          style={{
            position: "absolute",
            left: "-1px",
            top: "43px",
            display: isSelecting ? "flex" : "none",
            flexDirection: "column",
            gap: "20px",
            padding: "11px 16px 9px 16px",
            border: `1px solid ${color.outline}`,
            width: "calc(100% + 2px)",
            boxSizing: "border-box",
            borderRadius: "0px 0px 8px 8px",
            backgroundColor: `${color.input}`,
            zIndex: "3",
          }}
        >
          {isSelecting &&
            dropdownMenu.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    onChange(item);
                    setIsSelecting((prev) => !prev);
                  }}
                  style={{
                    ...typography.body2Medium,
                    color: `${color.onSurfaceActive}`,
                    height: "24px",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const valueDivStyle = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  padding: 10px 16px;
  border: 1px solid ${color.outline};
  border-radius: 8px;
  color: ${color.onSurfaceMuted};
`;

export default DropDown;
