import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Make sure to import from react-router-dom
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { checkAuth as checkAuthApi } from "@/api/auth";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    element: <PublicRoutes />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgotpassword", element: <ForgotPasswordPage /> },
      { path: "/resetpassword", element: <ResetPasswordPage /> },
    ],
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
  const { checkAuth, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const heartbeat = setInterval(async () => {
      try {
        await checkAuthApi();
      } catch {
        console.error(
          "Session expired during heartbeat check! Auto-logging out...",
        );
        await logout();
        window.location.href = "/login";
      }
    }, 15 * 60 * 1000); // Check every 15 minutes

    // Clean up the interval on component unmount
    return () => clearInterval(heartbeat);
  }, [isAuthenticated, logout]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        closeButton={false}
        icon={false}
        toastClassName={(context) => {
          // 1. Define our dynamic colors based on the toast type
          const typeClasses = {
            success: "border-green-500/50 bg-green-500/10 text-green-600", // Soft green glow
            error: "border-red-500/50 bg-red-500/10 text-red-600", // Soft red glow
            default: "border-white/30 bg-bg2 text-txt", // Standard theme
          };

          // 2. Safely grab the correct color, or fallback to default
          const colorClass =
            context?.type &&
            typeClasses[context.type as keyof typeof typeClasses]
              ? typeClasses[context.type as keyof typeof typeClasses]
              : typeClasses.default;

          // 3. Combine the tiny pill layout with the dynamic colors
          return `backdrop-blur-md rounded-full shadow-sm border mt-4 px-5 py-2 flex items-center justify-center font-sans text-xs !min-h-0 !w-auto mx-auto transition-all ${colorClass}`;
        }}
      />
    </div>
  );
}

export default App;
