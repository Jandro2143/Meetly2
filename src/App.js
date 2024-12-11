import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import SignIn from "./pages/sign_in";
import SignUp from "./pages/sign_up";
import CalendarPage from "./pages/calendar";
import Appointments from "./pages/appointments";
import Help from "./pages/help";
import Messages from "./pages/messages";
import Settings from "./pages/settings";
import Reports from "./pages/reports";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dynamic routes with :uniqueId */}
        <Route path="/home/:uniqueId" element={<HomePage />} />
        <Route path="/appointments/:uniqueId" element={<Appointments />} />
        <Route path="/help/:uniqueId" element={<Help />} />
        <Route path="/messages/:uniqueId" element={<Messages />} />
        <Route path="/settings/:uniqueId" element={<Settings />} />
        <Route path="/reports/:uniqueId" element={<Reports />} />
        <Route path="/calendar/:uniqueId" element={<CalendarPage />} />

        {/* Static routes */}
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
