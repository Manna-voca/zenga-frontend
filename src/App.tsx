import React from "react";
import {Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import CreateChannel from "./pages/CreateChannel";
import NewChannelOnboarding from "./pages/NewChannelOnboarding";
import OldChannelOnboarding from "./pages/OldChannelOnboarding";
import Praise from "./pages/Praise";
import Onboarding from "./pages/Onboarding";
import ChannelHome from "./pages/ChannelHome";
import MemberList from "./pages/MemberList";
import Notification from "./pages/Notification";
import CreateMeetup from "./pages/CreateMeetup";
import EditMeetup from "./pages/EditMeetup";
import ModifyChannelInfo from "./pages/ModifyChannelInfo";
import MeetupHome from "./pages/MeetupHome";
import MeetupDetail from "./pages/MeetupDetail";
import MeetupMember from "./pages/MeetupMember";
import CreateCard from "./pages/CreateCard";
import Mypage from "./pages/Mypage";
import Memberpage from "./pages/Memberpage";
import MyMeetup from "./pages/MyMeetup";
import ModifyProfileInfo from "./pages/ModifyProfileInfo";
import PointDetail from "./pages/PointDetail";
import Comment from "./pages/Comment";
import "./styles/font.css"
import Album from "./pages/Album";
import KaKao from "./pages/KaKao";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/oauth/callback/kakao" element={<KaKao />}></Route>
      <Route path="/onboarding" element={<Onboarding />}></Route>
      <Route path="/channel-home" element={<ChannelHome />}></Route>
      <Route path="/create-channel" element={<CreateChannel />}></Route>
      <Route path="/create-channel/new-onboarding" element={<NewChannelOnboarding />}></Route>
      <Route path="/create-channel/old-onboarding" element={<OldChannelOnboarding />}></Route>
      <Route path="/:channelCode/praise" element={<Praise />}></Route>
      <Route path="/:channelCode/member-list" element={<MemberList />}></Route>
      <Route path="/notification" element={<Notification />}></Route>
      <Route path="/create-meetup" element={<CreateMeetup />}></Route>
      <Route path="/edit-meetup/:meetupId" element={<EditMeetup />}></Route>
      <Route path="/:channelCode/modify-channel-info" element={<ModifyChannelInfo />}></Route>
      <Route path="/:channelCode/meetup-home" element={<MeetupHome />}></Route>
      <Route path="/:channelCode/meetup-detail/:meetupId" element={<MeetupDetail />}></Route>
      <Route path="/:channelCode/meetup-member/:meetupId" element={<MeetupMember />}></Route>
      <Route path="/create-card/:meetupId" element={<CreateCard />}></Route>
      <Route path="/comment/:meetupId" element={<Comment />}></Route>
      <Route path="/:channelCode/mypage" element={<Mypage />}></Route>
      <Route path="/:channelCode/memberpage/:memberId" element={<Memberpage />}></Route>
      <Route path="/my-meetup" element={<MyMeetup />}></Route>
      <Route path="/modify-profile-info" element={<ModifyProfileInfo />}></Route>
      <Route path="/point" element={<PointDetail />}></Route>
      <Route path="/album/:memberId" element={<Album />}></Route>
    </Routes>
  );
}

export default App;
