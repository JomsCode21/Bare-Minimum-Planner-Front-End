import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const PublicRoutes = () => {
    const { isAuthenticated, isCheckingAuth} = useAuthStore();

    if (isCheckingAuth) return null;

    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />
};

export default PublicRoutes;