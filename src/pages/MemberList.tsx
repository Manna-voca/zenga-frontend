import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import searchIcon from "../assets/icons/ic-search.svg";
import styled from "@emotion/styled";
import { color } from "../styles/color";
import { typography } from "../styles/typography";
import MemberWrapper from "../components/MemberWrapper";
import axios from "axios";

interface MemberProps {
  id: number;
  name: string;
  intro: string;
  level: string;
  image: string;
}

export default function MemberList() {
  const [searchWord, setSearchWord] = useState("");
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const CONFIG = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      // Authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM5MjA3MTAsImV4cCI6MTY5NzUyMDcxMCwic3ViIjoiMSIsIlRPS0VOX1RZUEUiOiJBQ0NFU1NfVE9LRU4ifQ.IT2kHS9XkWMI_Q92nrYmaKHtq8qlb_f55bWqQBP09JI",
    },
  };
  const CHANNEL_ID = localStorage.getItem("channelId");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" ||
      event.type === "click" ||
      event.key === "done" ||
      event.type === "done"
    ) {
      callSearchApi(searchWord);
    }
  };

  const callSearchApi = (term: string) => {
    if (!searchWord) return;
    console.log("검색어:", term);
  };

  const fetchMemberList = async () => {
    try {
      const membersResponse = await axios.get(
        `${SERVER_URL}/channels/${CHANNEL_ID}/members?size=20`,
        CONFIG
      );
      if (membersResponse.data && membersResponse.status === 200) {
        let members = membersResponse.data.content;
        const formatMembers = members.map((member: any) => ({
          id: member.id,
          name: member.name,
          intro: member.introduction,
          level: member.level,
          image: member.profileImageUrl,
        }));
        setMemberList(formatMembers);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [memberList, setMemberList] = useState<MemberProps[]>();

  useEffect(() => {
    fetchMemberList();
  }, []);

  return (
    <>
      <Header type="common" isChannelAdmin={false}></Header>
      <div style={{ padding: "0 20px", margin: "8px 0 4px 0" }}>
        <SearchWrapper>
          <img
            width="18px"
            onClick={() => callSearchApi(searchWord)}
            src={searchIcon}
            alt="검색"
            style={{ cursor: "pointer" }}
          />
          <SearchInput
            placeholder="멤버를 검색해 보세요"
            name="member-search"
            style={{
              ...typography.body3Regular,
              marginLeft: "8px",
              padding: "0",
            }}
            value={searchWord}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        </SearchWrapper>
        <div
          style={{
            ...typography.caption1Medium,
            color: `${color.onSurfaceMuted}`,
            height: "12px",
          }}
        >
          멤버 {memberList?.length}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {memberList?.map((item, index) => {
          return (
            <MemberWrapper
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              isChannelAdmin={item.level === "MAINTAINER"}
            />
          );
        })}
      </div>
      <div style={{ height: "57px" }}></div>
      <Navbar state={3}></Navbar>
    </>
  );
}

const SearchWrapper = styled.div`
  width: 100%;
  height: 32px;
  box-sizing: border-box;
  padding: 0 8px;
  display: flex;
  align-items: center;
  background-color: ${color.outline};
  border-radius: 8px;
  margin-bottom: 12px;
`;

const SearchInput = styled.input`
  font-family: Pretendard;
  width: 100%;
  height: 19px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${color.onSurfaceActive};
  &::placeholder {
    color: ${color.onSurfaceMuted};
  }
`;
