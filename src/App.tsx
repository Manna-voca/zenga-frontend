import { Routes, Route } from "react-router-dom";
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
import "./styles/font.css";
import Album from "./pages/Album";
import KaKao from "./pages/KaKao";
import CheckChannelCode from "./pages/CheckChannelCode";
import NotFound from "./pages/NotFound";
import Error400 from "./pages/Error400";
import CommonHeaderLayout from "./CommonHeaderLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/oauth/callback/kakao" element={<KaKao />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/channel-home" element={<ChannelHome />} />
      <Route path="/create-channel" element={<CreateChannel />} />
      <Route
        path="/create-channel/new-onboarding"
        element={<NewChannelOnboarding />}
      />
      <Route
        path="/create-channel/old-onboarding"
        element={<OldChannelOnboarding />}
      />
      <Route path="/:channelCode" element={<CheckChannelCode />} />
      <Route element={<CommonHeaderLayout />}>
        <Route path="/:channelCode/praise" element={<Praise />} />
        <Route path="/:channelCode/member-list" element={<MemberList />} />
        <Route path="/:channelCode/meetup-home" element={<MeetupHome />} />
      </Route>
      <Route path="/:channelCode/notification" element={<Notification />} />
      <Route path="/:channelCode/create-meetup" element={<CreateMeetup />} />
      <Route
        path="/:channelCode/edit-meetup/:meetupId"
        element={<EditMeetup />}
      />
      <Route
        path="/:channelCode/modify-channel-info"
        element={<ModifyChannelInfo />}
      />
      <Route
        path="/:channelCode/meetup-detail/:meetupId"
        element={<MeetupDetail />}
      />
      <Route
        path="/:channelCode/meetup-member/:meetupId"
        element={<MeetupMember />}
      />
      <Route
        path="/:channelCode/create-card/:meetupId"
        element={<CreateCard />}
      />
      <Route path="/:channelCode/comment/:meetupId" element={<Comment />} />
      <Route path="/:channelCode/mypage" element={<Mypage />} />
      <Route
        path="/:channelCode/memberpage/:memberId"
        element={<Memberpage />}
      />
      <Route path="/:channelCode/my-meetup" element={<MyMeetup />} />
      <Route path="/modify-profile-info" element={<ModifyProfileInfo />} />
      <Route path="/point" element={<PointDetail />} />
      <Route path="/:channelCode/album/:memberId" element={<Album />} />
      <Route path="/error-400" element={<Error400 />} />
      <Route path="/error-404" element={<NotFound />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
