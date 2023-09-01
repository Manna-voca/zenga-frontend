import React from "react";
import {Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import CreateChannel from "./pages/CreateChannel";
import NewChannelOnboarding from "./pages/NewChannelOnboarding";
import OldChannelOnboarding from "./pages/OldChannelOnboarding";
import Home from "./pages/Home";
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
import UserProfile from "./pages/UserProfile";
import MyMeetup from "./pages/MyMeetup";
import ModifyProfileInfo from "./pages/ModifyProfileInfo";
import PointDetail from "./pages/PointDetail";
import Comment from "./pages/Comment";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/onboarding" element={<Onboarding />}></Route>
      <Route path="/channel-home" element={<ChannelHome />}></Route>
      <Route path="/createchannel" element={<CreateChannel />}></Route>
      <Route path="/createchannel/newonboarding" element={<NewChannelOnboarding />}></Route>
      <Route path="/createchannel/oldonboarding" element={<OldChannelOnboarding />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/member-list" element={<MemberList />}></Route>
      <Route path="/notification" element={<Notification />}></Route>
      <Route path="/create-meetup" element={<CreateMeetup />}></Route>
      <Route path="/edit-meetup/:meetupId" element={<EditMeetup />}></Route>
      <Route path="/modify-channel-info" element={<ModifyChannelInfo />}></Route>
      <Route path="/meetup-home" element={<MeetupHome />}></Route>
      <Route path="/meetup-detail/:meetupId" element={<MeetupDetail />}></Route>
      <Route path="/meetup-member/:meetupId" element={<MeetupMember />}></Route>
      <Route path="/create-card/:meetupId" element={<CreateCard />}></Route>
      <Route path="/mypage" element={<Mypage />}></Route>
      <Route path="/userprofile/:userId" element={<UserProfile />}></Route>
      <Route path="/meetup-my" element={<MyMeetup />}></Route>
      <Route path="/modify-profile-info" element={<ModifyProfileInfo />}></Route>
      <Route path="/point" element={<PointDetail />}></Route>
      <Route path="/comment" element={<Comment />}></Route>
    </Routes>
  );
}

export default App;
