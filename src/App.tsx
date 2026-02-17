import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: LandingPage,
    },
    {
      path: "/login",
      Component: LoginPage,
    },
    {
      path: "/register",
      Component: RegisterPage
    },
    {
      path: "/forgotpassword",
      Component: ForgotPasswordPage
    },
    {
      path: "/resetpassword",
      Component: ResetPasswordPage
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/dashboard",
          Component: Dashboard
        },
      ]
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
    </div>
  );
}

export default App;
