import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page with empty calendar and navbar */}
        <Route path="/" element={<Home />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected app views placeholder */}
        <Route
          path="/profile"
          element={
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
              <div className="text-center p-8 rounded-xl border border-border bg-card shadow-xs">
                <h2 className="text-xl font-bold font-heading mb-2">Profile Page</h2>
                <p className="text-muted-foreground text-sm">You are successfully authenticated.</p>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}