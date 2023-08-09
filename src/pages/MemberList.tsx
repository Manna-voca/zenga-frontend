import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import searchIcon from "../assets/icons/ic-search.svg";
import styled from "@emotion/styled";
import { color } from "../styles/color";
import { typography } from "../styles/typography";
import profile1 from "../assets/images/profile-1.png";
import profile2 from "../assets/images/profile-2.png";
import profile3 from "../assets/images/profile-3.png";
import profileDefault from "../assets/images/profile-default.png";
import MemberWrapper from "../components/MemberWrapper";

export default function MemberList() {
  const [searchWord, setSearchWord] = useState("");

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

  const memberDummy = [
    { name: "윤석민", image: profile1, isChannelAdmin: true },
    { name: "송현섭", image: profile2, isChannelAdmin: false },
    { name: "박세원", image: profile3, isChannelAdmin: false },
    { name: "김수한무", image: profileDefault, isChannelAdmin: false },
  ];

  return (
    <>
      <Header type="common"></Header>
      <div style={{ padding: "0 20px", margin: "8px 0 4px 0" }}>
        <SearchWrapper>
          <img
            onClick={() => callSearchApi(searchWord)}
            src={searchIcon}
            alt="검색"
          />
          <SearchInput
            placeholder="멤버를 검색해 보세요"
            type="search"
            name="member-search"
            style={{ ...typography.body3Regular }}
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
          멤버 {memberDummy.length}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {memberDummy.map((item) => {
          return (
            <MemberWrapper
              name={item.name}
              image={item.image}
              isChannelAdmin={item.isChannelAdmin}
            />
          );
        })}
      </div>
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
  gap: 8px;
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
