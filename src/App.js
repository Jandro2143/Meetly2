import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './pages/calendar';
import SignIn from './pages/sign_in';
import SignUp from './pages/sign_up';

function App() {
  return (
    <Router>
      <div>
        {/* Define the Routes */}
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
