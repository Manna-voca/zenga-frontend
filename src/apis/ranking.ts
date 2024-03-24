import { axiosInstance } from "./axiosInstance";

export interface RankingType {
  memberId: number;
  rank: number;
  userProfileImage: string;
  nickname: string;
  point: number;
}

export interface RankPointHistoryType {
  date: string;
  contents: string;
  point: number;
}

export const fetchMyRankInfo = async (): Promise<RankingType> => {
  const CHANNEL_ID = localStorage.getItem("channelId");

  if (!CHANNEL_ID) return Promise.reject(new Error("channelId is not set"));

  const { data } = await axiosInstance.get(
    `/ranking/my?channelId=${CHANNEL_ID}`
  );

  return data.data;
};

export const fetchEntireRankInfo = async (): Promise<RankingType[]> => {
  const CHANNEL_ID = localStorage.getItem("channelId");

  if (!CHANNEL_ID) return Promise.reject(new Error("channelId is not set"));

  const { data } = await axiosInstance.get(`/ranking?channelId=${CHANNEL_ID}`);

  return data.data.memberRankDtos;
};

export const fetchMyRankPointHistory = async (): Promise<
  RankPointHistoryType[]
> => {
  const memberId = localStorage.getItem("memberId");

  if (!memberId) return Promise.reject(new Error("memberId is not set"));

  const { data } = await axiosInstance.get(
    `/ranking/point/history?memberId=${memberId}`
  );

  return data.data.rankingPointHistoryDtos;
};
