import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import MyRegistrations from "./pages/MyRegistrations";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/admin" element={<AdminDashboard />}/>
                <Route path="/student" element={<StudentDashboard />}/>
                <Route path="/my-registrations" element={<MyRegistrations />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;