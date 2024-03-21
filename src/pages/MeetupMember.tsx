import { useEffect, useState } from "react";
import Header from "../components/Header";
import MemberWrapper from "../components/MemberWrapper";
import { axiosInstance } from "../apis/axiosInstance";
import { useParams } from "react-router-dom";

interface Props {
  state?: "album";
  albumId?: string;
}

const MeetupMember = ({ state, albumId }: Props) => {
  let { meetupId } = useParams();
  const [memberList, setMemberList] = useState<Array<any>>([]);

  const fetchMemberList = async () => {
    try {
      const membersResponse = await axiosInstance.get(
        `/party/detail/${meetupId}?channelId=${localStorage.getItem(
          "channelId"
        )}`
      );
      if (membersResponse.status === 200) {
        setMemberList(membersResponse.data.data.joinMemberInfo);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getMemberList = async () => {
    await axiosInstance
      .get(`/album/paticipation/${albumId}/with`)
      .then((res) => {
        setMemberList(res.data.data.participationList);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (state === "album") {
      getMemberList();
    } else {
      fetchMemberList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header type="back" text="참여한 멤버"></Header>
      {memberList.map((item, index) => {
        return (
          <MemberWrapper
            key={index}
            name={state === "album" ? item.nickname : item.memberName}
            id={state === "album" ? item.id : item.memberId}
            image={
              state === "album" ? item.profileUrl : item.memberProfileImageUrl
            }
          />
        );
      })}
    </>
  );
};

export default MeetupMember;
