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
      <Route path="/comment" element={<Comment />}></Route>
    </Routes>
  );
}

export default App;
