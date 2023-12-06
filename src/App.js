import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// ... other imports
import "./App.css";

//utilities
import ProtectedRoute from "./utilitiies/ProtectedRoute";

//components
import PageLayout from "./components/PageLayout";

//pages
import Test from "./pages/Test";
import Login from "./pages/auth/Login";

import Dashboard from "./pages/Dashboard";
import Clock from "./pages/Clock";
import Message from "./pages/Message";
import ViewShifts from "./pages/ViewShifts";
import Setting from "./pages/Setting";
import AssignShifts from "./pages/manager/AssignShifts"
import Admin from "./pages/admin";

export default function App() {
  return (
    <div>
      <Routes>
        <>
          <Route path="/test" element={<Test />} />
        </>

        <Route>
          <Route path="/auth/login" element={<Login />} />
          {/* <Route path="/auth/signup" element={<Signup />} /> */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
        </Route>

        <Route>
          <Route path="/dashboard" element={<ProtectedRoute><PageLayout><Dashboard /></PageLayout></ProtectedRoute>} />
          <Route path="/dashboard/clock" element={<ProtectedRoute><PageLayout><Clock /></PageLayout></ProtectedRoute>} />
          <Route path="/dashboard/message" element={<ProtectedRoute><PageLayout><Message /></PageLayout></ProtectedRoute>} />
          <Route path="/dashboard/scheduling" element={<ProtectedRoute><PageLayout><ViewShifts /></PageLayout></ProtectedRoute>} />
          <Route path="/dashboard/setting" element={<ProtectedRoute><PageLayout><Setting /></PageLayout></ProtectedRoute>} />
          <Route path="/dashboard/admin" element={<ProtectedRoute><PageLayout><Admin /></PageLayout></ProtectedRoute>} />

        </Route>

        <Route>
          <Route path="/dashboard/manager/assign" element={<ProtectedRoute><PageLayout><AssignShifts /></PageLayout></ProtectedRoute> } />
        </Route>
      </Routes>
    </div>
  );
}
