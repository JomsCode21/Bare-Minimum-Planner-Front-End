import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Dashboard from "./pages/Dashboard";
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
      path: "/dashboard",
      Component: Dashboard
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
