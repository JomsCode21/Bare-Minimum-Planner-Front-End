import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Make sure to import from react-router-dom
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

// Pages & Components
import Dashboard from "./pages/dashboard/Dashboard";
import ForgotPasswordPage from "./pages/forgotpassword/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ResetPasswordPage from "./pages/forgotpassword/ResetPasswordPage";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import PublicRoutes from "./components/routes/PublicRoutes";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
    {
      path: "/",
      Component: LandingPage,
    },
    {
      element: <PublicRoutes />,
      children: [
        {path: "/login", element: <LoginPage />},
        {path: "/register", element: <RegisterPage />},
        {path: "/forgotpassword", element: <ForgotPasswordPage />},
        {path: "/resetpassword", element: <ResetPasswordPage />},
      ]
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

function App() {
  const { checkAuth } = useAuthStore();
  

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
    </div>
  );
}

export default App;
