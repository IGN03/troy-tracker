import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Temporarily redirect the root to the login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
        
        {/* Placeholder for where they land after signing in */}
        <Route path="/profile" element={<div>Profile Page (Protected)</div>} />
      </Routes>
    </BrowserRouter>
  );
}