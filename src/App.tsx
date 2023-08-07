import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Onboarding from "./pages/Onboarding";
import ChannelHome from "./pages/ChannelHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />}></Route>
      <Route path="/channel-home" element={<ChannelHome />}></Route>
    </Routes>
  );
}

export default App;
