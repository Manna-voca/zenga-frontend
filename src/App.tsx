import React from "react";
import {Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import CreateChannel from "./pages/CreateChannel";
import NewChannelOnboarding from "./pages/NewChannelOnboarding";
import OldChannelOnboarding from "./pages/OldChannelOnboarding";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/createchannel" element={<CreateChannel />}></Route>
      <Route path="/createchannel/newonboarding" element={<NewChannelOnboarding />}></Route>
      <Route path="/createchannel/oldonboarding" element={<OldChannelOnboarding />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
