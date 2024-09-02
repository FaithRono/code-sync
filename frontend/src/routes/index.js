// src/routes/index.js or wherever you configure your router
import { createBrowserRouter } from 'react-router-dom';
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import RegisterPage from "../pages/RegisterPage";
import ProjectPage from "../pages/ProjectPage";
import EditorPage from "../pages/EditorPage";
import ProfilePage from "../pages/ProfilePage";
import WelcomePage from "../pages/WelcomePage";
import VideoChatPage from "../components/VideoChat/VideoChat";
import Notification from "../components/Notifications/Notification";
import Dashboard from "../components/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "projects",
                element: <ProjectPage />
            },
            {
                path: "editor",
                element: <EditorPage />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "welcome",
                element: <WelcomePage />
            },
            {
                path: "videochat",
                element: <VideoChatPage />
            },
            {
                path: "notifications",
                element: <Notification />   
            },
            
            
        ]
    }
]);

export default router;
