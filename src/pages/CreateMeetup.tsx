/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import InputText from "../components/InputText";
import TextField from "../components/TextField";
import InputNumber from "../components/InputNumber";
import { color } from "../styles/color";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";
import downArrowActiveIcon from "../assets/icons/ic-downArrowActive.svg";
import downArrowMutedIcon from "../assets/icons/ic-downArrowMuted.svg";
import MeetupImageEditor from "../components/MeetupImageEditor";
import ButtonBasic from "../components/ButtonBasic";
import { typography } from "../styles/typography";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface MeetupInfoProps {
  title: string;
  date?: Date | null;
  place?: string;
  content: string;
  personNum: string;
}

const initialMeetupInfo: MeetupInfoProps = {
  title: "",
  date: null,
  place: "",
  content: "",
  personNum: "",
};

const CreateMeetup = () => {
  const navigate = useNavigate();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { channelCode } = useParams();
  const CONFIG = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };
  const CHANNEL_ID = localStorage.getItem("channelId");

  const [meetupInfo, setMeetupInfo] =
    useState<MeetupInfoProps>(initialMeetupInfo);

    const currentDate = new Date(); // 현재 날짜 및 시간 가져오기
    const MAX_DATE = new Date(currentDate); // 복제하여 새로운 Date 객체 생성
    MAX_DATE.setFullYear(currentDate.getFullYear() + 1); // 1년을 추가

  const setDateUndefined = () => {
    setMeetupInfo((prev) => ({
      ...prev,
      date: prev.date === undefined ? null : undefined,
    }));
  };

  const setPlaceUndefined = () => {
    setMeetupInfo((prev) => ({
      ...prev,
      place: prev.place === undefined ? "" : undefined,
    }));
  };

  const handleDateChange = (date: Date) => {
    setMeetupInfo((prev) => ({ ...prev, date }));
  };

  // 게시글 첨부 사진
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setAttachment(files[0]);
    }
    event.target.value = "";
  };

  const handleImageDelete = useCallback(() => {
    setAttachment(null);
  }, []);

  let isPostValid =
    meetupInfo.title.length > 0 &&
    meetupInfo.date !== null &&
    meetupInfo.place !== "" &&
    meetupInfo.content.length > 0 &&
    Number(meetupInfo.personNum) > 1;

  const postNewMeetup = async () => {
    let partyInfo = {
      channelId: CHANNEL_ID,
      title: meetupInfo.title,
      content: meetupInfo.content,
      maxCapacity: meetupInfo.personNum,
      location: meetupInfo.place === undefined ? "" : meetupInfo.place,
      partyDate: meetupInfo.date === undefined ? "" : meetupInfo.date,
      partyImageUrl: "",
    };
    try {
      if (attachment !== null) {
        const formData = new FormData();
        formData.append("image", attachment ? attachment : "");
        const uploadImageResponse = await axios.post(
          `${SERVER_URL}/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (uploadImageResponse.status === 200) {
          console.log(uploadImageResponse.data);
          partyInfo.partyImageUrl = uploadImageResponse.data.data.url;
        } else {
          alert(uploadImageResponse.data.message);
        }
      }
      const postResponse = await axios.post(
        `${SERVER_URL}/party/create`,
        partyInfo,
        CONFIG
      );
      if (postResponse.status === 200) {
        navigate(
          `/${channelCode}/meetup-detail/${postResponse.data.data.partyId}`,
          { replace: true }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header type="out" text="모임 만들기" />
      <div style={{ padding: "0 20px" }}>
        <div style={{ height: "28px" }} />
        {/* 모임 제목 ----------------------------------- start */}
        <InputText
          isNecessary={true}
          label="모임 제목"
          placeholder="모임 제목을 입력해 주세요"
          onChange={(event) =>
            setMeetupInfo((prev) => ({ ...prev, title: event.target.value }))
          }
          value={meetupInfo.title}
        />
        <div style={{ height: "28px" }} />
        {/* 모임 제목 ----------------------------------- end */}

        {/* 모임 날짜 ----------------------------------- start */}
        <Label>
          모임 일시
          <img
            style={{
              position: "absolute",
              top: "35px",
              right: "16px",
              zIndex: "1",
            }}
            src={meetupInfo.date ? downArrowActiveIcon : downArrowMutedIcon}
            alt=""
          />
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "54px",
              fontSize: "12px",
              color: `${color.primary500}`,
              lineHeight: "16px",
            }}
          >
            *
          </div>
        </Label>
        <MyDatePicker
          locale={ko}
          selected={meetupInfo.date}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="MMMM d일 (E) HH:mm"
          onFocus={(e) => e.target.blur()}
          timeCaption="시간"
          placeholderText="날짜 및 시간을 선택해 주세요"
          minDate={new Date()}
          maxDate={MAX_DATE}
        />

        <div style={{ height: "16px" }} />
        <button
          style={{
            backgroundColor:
              meetupInfo.date === undefined ? `${color.primary500}` : "",
            color:
              meetupInfo.date === undefined ? `${color.onPrimaryActive}` : "",
            border:
              meetupInfo.date === undefined
                ? `1px solid ${color.primary500}`
                : "",
          }}
          css={undefinedButtonStyle}
          onClick={() => setDateUndefined()}
        >
          날짜 미정
        </button>
        {/* 모임 날짜 ----------------------------------- end */}

        {/* 모임 장소 ----------------------------------- start */}
        <div style={{ height: "28px" }} />
        <InputText
          isNecessary={true}
          label="모임 장소"
          placeholder="모임 장소를 입력해 주세요"
          onChange={(event) =>
            setMeetupInfo((prev) => ({ ...prev, place: event.target.value }))
          }
          value={meetupInfo.place === undefined ? "" : meetupInfo.place}
        />
        <div style={{ height: "16px" }} />
        <button
          style={{
            backgroundColor:
              meetupInfo.place === undefined ? `${color.primary500}` : "",
            color:
              meetupInfo.place === undefined ? `${color.onPrimaryActive}` : "",
            border:
              meetupInfo.place === undefined
                ? `1px solid ${color.primary500}`
                : "",
          }}
          css={undefinedButtonStyle}
          onClick={() => setPlaceUndefined()}
        >
          장소 미정
        </button>
        {/* 모임 장소 ----------------------------------- end */}

        {/* 모임 내용 ----------------------------------- start */}
        <div style={{ height: "28px" }} />
        <TextField
          isNecessary={true}
          label="모임 내용"
          placeholder="내용을 입력해 주세요"
          onChange={(event) =>
            setMeetupInfo((prev) => ({ ...prev, content: event.target.value }))
          }
          value={meetupInfo.content}
        />
        {/* 모임 내용 ----------------------------------- end */}

        {/* 참여 인원 ----------------------------------- start */}
        <div style={{ height: "28px" }} />
        <InputNumber
          label="참여 인원"
          isNecessary={true}
          placeholder="참여 인원을 입력해주세요 (최대 20명)"
          value={meetupInfo.personNum}
          onChange={(event) =>
            setMeetupInfo((prev) => ({
              ...prev,
              personNum: event.target.value,
            }))
          }
        />
        {/* 참여 인원 ----------------------------------- end */}

        {/* 사진 ----------------------------------- start */}
        <div style={{ height: "28px" }} />
        <MeetupImageEditor
          attachment={attachment}
          handleImageUpload={handleImageUpload}
          handleImageDelete={handleImageDelete}
        />
        <div style={{ height: "131px" }} />
        {/* 사진 ----------------------------------- end */}
      </div>

      {/* Fixed 버튼 영역 */}
      <div
        style={{
          margin: "0",
          left: "0",
          bottom: "0",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxWidth: "100%",
          marginTop: "48px",
          padding: "8px 0",
          boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.10)",
          background: `${color.background}`,
        }}
      >
        <div style={{ width: "calc(100% - 40px)", maxWidth: "460px" }}>
          <ButtonBasic
            innerText="완료"
            onClick={() => {
              postNewMeetup();
            }}
            disable={!isPostValid}
          />
        </div>
      </div>
    </>
  );
};

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  color: ${color.onSurfaceDefault};
  margin-bottom: 4px;
  position: relative;
`;

const MyDatePicker = styled(DatePicker)`
  height: 44px;
  background-color: ${color.input};
  display: flex;
  border: 1px solid ${color.outline};
  border-radius: 8px;
  padding: 10px 16px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  width: 100%;
  max-width: 460px;
  box-sizing: border-box;
  color: ${color.onSurfaceActive};
  &:hover {
    cursor: pointer;
  }
  &::placeholder {
    color: ${color.onSurfaceMuted};
  }
`;

const undefinedButtonStyle = css`
  width: 82px;
  height: 30px;
  font-family: Pretendard;
  cursor: pointer;
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  border: none;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 4px 14px;
  color: ${color.onSurfaceMuted};
  background-color: ${color.background};
  border: 1px solid ${color.outline};
`;

export default CreateMeetup;
