import react, { useState } from "react";

import { typography } from "../styles/typography";
import { color } from "../styles/color";
import InputText from "../components/InputText";
import DropDown from "../components/DropDown";
import DatePicker from "../components/DatePicker";
import ButtonBasic from "../components/ButtonBasic";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
      <Header type="back" />
      <div style={{ padding: "0 20px", marginTop: "16px" }}>
        <h1
          style={{
            ...typography.heading1Semibold,
            color: `${color.onSurfaceActive}`,
            height: "59px",
            display: "flex",
            flexDirection: "column",
            flexShrink: "0",
            justifyContent: "center",

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
