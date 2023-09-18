import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MemberWrapper from "../components/MemberWrapper";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Props{
    state?: "album";
    albumId?: string;
};

const MeetupMember = ({state, albumId}:Props) => {
    let { meetupId } = useParams();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };

    const [memberList, setMemberList] = useState<Array<any>>([]);

    const fetchMemberList = async () => {
        const membersResponse = await axios.get(`${SERVER_URL}/party/detail/${meetupId}?channelId=${localStorage.getItem('channelId')}`, CONFIG);
        if(membersResponse.status === 200){
            setMemberList(membersResponse.data.data.joinMemberInfo);
        }
    };

    const getMemberList = async () => {
        await axios.get(`${SERVER_URL}/album/paticipation/${albumId}/with`, CONFIG).then((res) => {
            console.log(res.data.data);
            setMemberList(res.data.data.participationList);
        })
    };

    useEffect(() => {
        if(state === "album"){
            getMemberList();
        }
        else{
            fetchMemberList();
        }
    }, []);

    return(
        <>
            <Header
                type="back"
                text="참여한 멤버"
            ></Header>
            {memberList.map((item, index) => {
                return(
                    <MemberWrapper
                        key={index}
                        name={state === "album" ? item.nickname : item.memberName}
                        id={state === "album" ? item.id : item.memberId}
                        image={state === "album" ? item.profileUrl : item.memberProfileImageUrl}
                        isChannelAdmin={state === "album" ? false : (item.isChannelMaker ? true : false)}
                    />
                )
            })}
        </>
    );
}

export default MeetupMember;