import { Route, Navigate, Routes } from "react-router-dom";
import HomePape from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import { SignupPage } from "../pages/SignupPage";

export default function UseRoutes(isAuth) {

    if (isAuth) {
        return (
            <Routes>
                <Route path="/" element={<HomePape />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    )
}