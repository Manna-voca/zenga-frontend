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
    </Routes>
  );
}

export default App;
