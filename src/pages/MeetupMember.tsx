import React from "react";
import Header from "../components/Header";
import MemberWrapper from "../components/MemberWrapper";
import testUserImg from '../images/channelprofile.png';

const MeetupMember = () => {
    return(
        <>
            <Header
                type="back"
                text="참여한 멤버"
            ></Header>
            <MemberWrapper
                name="모아이"
                id={1}
                image={testUserImg}
                isChannelAdmin={true}
            />
            <MemberWrapper
                name="모아이모"
                id={1}
                image={testUserImg}
                isChannelAdmin={false}
            />
            <MemberWrapper
                name="모아이모아"
                id={1}
                image={testUserImg}
                isChannelAdmin={false}
            />
            <MemberWrapper
                name="모아이모아이"
                id={1}
                image={testUserImg}
                isChannelAdmin={false}
            />
            <MemberWrapper
                name="모아이"
                id={1}
                image={testUserImg}
                isChannelAdmin={false}
            />
        </>
    );
}

export default MeetupMember;