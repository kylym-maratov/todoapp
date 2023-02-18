import { Route, Navigate, Routes } from "react-router-dom";
import { LoginPage, SignupPage } from "../pages/AuthPage";
import DashBoardPage from "../pages/DashBoardPage";
import ProfilePage from "../pages/ProfilePage";

export default function UseRoutes(isAuth) {

    if (isAuth) {
        return (
            <Routes>
                <Route path="/dashboard" element={<DashBoardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}