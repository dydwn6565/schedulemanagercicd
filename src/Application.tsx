import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Login from './Login';
import DateScheduleManagement from './DateScheduleManagement';
import TimeScheduleManangement from './TimeScheduleManangement';
import SignUp from './SignUp';

export interface IApplicationProps{}

const Application: React.FunctionComponent<IApplicationProps>=(props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/date" element={<DateScheduleManagement />} />
        <Route path="/time" element={<TimeScheduleManangement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Application