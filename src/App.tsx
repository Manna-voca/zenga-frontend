import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />}></Route>
    </Routes>
  );
}

export default App;
