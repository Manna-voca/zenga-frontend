/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import searchIcon from "../assets/icons/ic-search.svg";
import styled from "@emotion/styled";
import { color } from "../styles/color";
import { typography } from "../styles/typography";
import MemberWrapper from "../components/MemberWrapper";
import axios from "axios";
import memberNotFoundWhale from "../assets/images/x_whale_character.png";

interface MemberProps {
  id: number;
  name: string;
  intro: string;
  level: string;
  image: string;
}

export default function MemberList() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const CONFIG = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
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

  const fetchMemberList = async (
    cursorId?: number,
    cursorName?: string,
    size?: number,
    keyword?: string
  ) => {
    if (loading) return;
    const uri =
      `${SERVER_URL}/channels/${CHANNEL_ID}/members` +
      (size || cursorId || keyword ? "?" : "") +
      (size ? `size=${size}` : "") +
      (cursorId
        ? size
          ? `&cursorId=${cursorId}`
          : `cursorId=${cursorId}`
        : "") +
      (cursorName
        ? size || cursorId
          ? `&cursorName=${cursorName}`
          : `cursorName=${cursorName}`
        : "") +
      (keyword
        ? size || cursorId || cursorName
          ? `&keyword=${keyword}`
          : `keyword=${keyword}`
        : "");
    try {
      if (hasMore === false && keyword === "") {
        return;
      }
      setLoading(true);

      const membersResponse = await axios.get(`${uri}`, CONFIG);
      
      if (membersResponse.data && membersResponse.status === 200) {
        const newMembers = membersResponse.data.content.map((member: any) => ({
          id: member.id,
          name: member.name,
          intro: member.introduction,
          level: member.level,
          image: member.profileImageUrl,
        }));
        if (keyword) {
          setSearchMemberList(newMembers);
        } else {
          setMemberList((prev) => [...prev, ...newMembers]);
          if (cursorId !== undefined && size !== undefined) {
            if (membersResponse.data.hasNext === false) {
              setHasMore(false);
              setCursorId(Number(newMembers[newMembers.length - 1].id));
              setCursorName(newMembers[newMembers.length - 1].name);
            } else {
              setCursorId(Number(newMembers[newMembers.length - 1].id));
              setCursorName(newMembers[newMembers.length - 1].name);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  

  const fetchTotalMemberCount = async () => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/channels/${CHANNEL_ID}/count`,
        CONFIG
      );
      setTotalMemberCount(res.data.data.count);
      return res.data.data.count as number;
    } catch (error) {
      console.log(error);
    }
  };

  const [memberList, setMemberList] = useState<MemberProps[]>([]);
  const [searchMemberList, setSearchMemberList] = useState<
    MemberProps[] | null
  >(null);
  const [cursorId, setCursorId] = useState<number>(0);
  const [cursorName, setCursorName] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const SIZE = 15;
  const [loading, setLoading] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalMemberCount, setTotalMemberCount] = useState<number>(0);

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollHeight - containerRef.current.scrollTop <=
        containerRef.current.clientHeight + 1
    ) {
      fetchMemberList(cursorId, cursorName, SIZE, "");
    }
  };

  const callSearchApi = async (term: string) => {
    if (!searchWord) return;
    fetchMemberList(0, undefined, 100, term);
  };

  useEffect(() => {
    fetchTotalMemberCount();
    fetchMemberList(cursorId, cursorName, SIZE, "");
  }, []);

  useEffect(() => {
    if (searchWord === "") setSearchMemberList(null);
  }, [searchWord]);

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
          멤버 {searchMemberList ? searchMemberList?.length : totalMemberCount}
        </div>
      </div>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 172px)",
          maxHeight: "calc(100vh - 172px)",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "20",
            }}
          >
            <LoadingSpinner />
          </div>
        )}
        {searchMemberList ? (
          searchMemberList.length === 0 ? (
            <div
              style={{
                marginTop: "98px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img width={"72px"} src={memberNotFoundWhale} alt="" />
              <div
                style={{
                  ...typography.body1Regular,
                  color: `${color.onSurfaceActive}`,
                }}
              >
                해당하는 <b>멤버</b>가 없어요
              </div>
            </div>
          ) : (
            searchMemberList?.map((item, index) => {
              return (
                <MemberWrapper
                  key={index}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  isChannelAdmin={item.level === "MAINTAINER"}
                />
              );
            })
          )
        ) : (
          memberList?.map((item, index) => {
            return (
              <MemberWrapper
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                isChannelAdmin={item.level === "MAINTAINER"}
              />
            );
          })
        )}
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

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid ${color.surface};
  border-top-color: ${color.primary300};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
