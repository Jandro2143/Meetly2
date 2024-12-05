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
        <Route path="/home" element={<HomePage />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/help" element={<Help />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
