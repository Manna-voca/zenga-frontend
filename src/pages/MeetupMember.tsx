import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MemberWrapper from "../components/MemberWrapper";
import axios from "axios";
import { useParams } from "react-router-dom";

const MeetupMember = () => {
    const { meetupId } = useParams();

    const [memberList, setMemberList] = useState<Array<any>>([]);

    const fetchMemberList = async () => {
        const membersResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/party/detail/${meetupId}?channelId=${localStorage.getItem('channelId')}`, {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESSTOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        if(membersResponse.status === 200){
            setMemberList(membersResponse.data.data.joinMemberInfo);
        }
    };

    useEffect(() => {
        fetchMemberList();
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
                        name={item.memberName}
                        id={item.memberId}
                        image={item.memberProfileImageUrl}
                        isChannelAdmin={item.isChannelMaker ? true : false}
                    />
                )
            })}
        </>
    );
}

export default MeetupMember;