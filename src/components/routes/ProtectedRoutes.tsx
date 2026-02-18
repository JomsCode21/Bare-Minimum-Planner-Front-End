import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoutes = () => {

    const { isAuthenticated, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/500 border-t-transparent"></div>
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;