/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import react, { useState } from "react";

import icBack from "../assets/icons/ic-back.svg";
import { typography } from "../styles/typography";
import { color } from "../styles/color";
import InputText from "../components/InputText";
import DropDown from "../components/DropDown";
import DatePicker from "../components/DatePicker";
import ButtonBasic from "../components/ButtonBasic";
import { useNavigate } from "react-router-dom";

const backNavigationBarStyle = css`
  display: flex;
  padding-left: 16px;
  align-items: center;
  height: 40px;
`;

export default function Onboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const [gender, setGender] = useState<string>("");
  const genderChoices = ["여자", "남자"];

  const [birthDate, setBirthDate] = useState<string>("");

  let checkOnboarding = !(name && gender);

  return (
    <>
      <div css={backNavigationBarStyle}>
        <img /* onClick={ 뒤로가기 } */ src={icBack} alt="뒤로가기" />
      </div>
      <div style={{ padding: "0 20px" }}>
        <h1
          style={{
            ...typography.heading1Semibold,
            color: `${color.onSurfaceActive}`,
            height: "59px",
            display: "flex",
            flexDirection: "column",
            flexShrink: "0",
            justifyContent: "center",
            marginTop: "16px",
            marginBottom: "40px",
          }}
        >
          기본적인 정보를
          <br />
          입력해 주세요
        </h1>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            marginBottom: "217px",
          }}
        >
          <InputText
            isNecessary={true}
            label="이름"
            placeholder="이름을 입력해 주세요."
            value={name}
            onChange={handleNameChange}
          />
          <DropDown
            isNecessary={true}
            label="성별"
            placeholder="성별을 선택해 주세요."
            dropdownMenu={genderChoices}
            onChange={setGender}
            value={gender}
          />
          <DatePicker
            isNecessary={true}
            label="생년월일"
            placeholder="생년월일을 선택해 주세요."
            value={birthDate}
          />
        </section>
        <ButtonBasic
          innerText="확인"
          disable={checkOnboarding}
          onClick={() => navigate("/channel-home")}
        />
      </div>
    </>
  );
}
