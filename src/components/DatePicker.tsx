/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import "../styles/datepicker.css";

import react, { FC, useState } from "react";
import { color } from "../styles/color";
import { typography } from "../styles/typography";
import icUpArrow from "../assets/icons/ic-upArrow.svg";
import icDownArrowMuted from "../assets/icons/ic-downArrowMuted.svg";
import icDownArrowActive from "../assets/icons/ic-downArrowActive.svg";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; //한국어 설정

interface DatePickerProps {
  label: string;
  isNecessary: boolean;
  placeholder: string;
  value: string;
  birthDate: string;
  setBirthDate: react.Dispatch<react.SetStateAction<string>>;
}

const DatePicker: FC<DatePickerProps> = ({
  label,
  isNecessary,
  placeholder,
  value,
  birthDate,
  setBirthDate,
}) => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const handleDateChange = (date: Date) => {
    const formatDatetoString = (birthDate: Date) => {
      const year = birthDate.getFullYear();
      const month = (birthDate.getMonth() + 1).toString().padStart(2, "0");
      const date = birthDate.getDate().toString().padStart(2, "0");
      return `${year}.${month}.${date}`;
    };
    setBirthDate(formatDatetoString(date));
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

      <div style={{ position: "relative", width: "100%" }}>
        {isSelecting && (
          <div
            style={{
              zIndex: "3",
              position: "fixed",
              background: "rgba(0,0,0,0.50)",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
            }}
          />
        )}
        {/* <div style={{ position: "relative", zIndex: "2" }}> */}
          <StyledDatePicker
            onCalendarClose={() => setIsSelecting((prev) => !prev)}
            onCalendarOpen={() => {
              setIsSelecting((prev) => !prev);
            }}
            title=""
            locale={ko}
            onChange={handleDateChange}
            value={birthDate}
            placeholderText={placeholder}
            required
            onFocus={(e) => e.target.blur()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        {/* </div> */}
        <img
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "16px",
            zIndex: "1",
          }}
          onClick={undefined}
          src={isSelecting ? icUpArrow : icDownArrowMuted}
          alt=""
        />
      </div>
    </div>
  );
};

const StyledDatePicker = styled(ReactDatePicker)`
  position: relative;
  font-family: Pretendard;
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  z-index: 2;
  display: flex;
  background-color: transparent;
  color: ${color.onSurfaceActive};
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  border: 1px solid ${color.outline};
  border-radius: 8px;
  padding: 10px 16px;
  &:hover {
    cursor: pointer;
  }
  &::placeholder {
    color: ${color.onSurfaceMuted};
  }
`;

export default DatePicker;
