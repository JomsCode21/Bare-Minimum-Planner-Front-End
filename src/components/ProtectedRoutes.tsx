import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    // Checking is user data exis in Local Storage
    const user = JSON.parse(localStorage.getItem("user") || "null");

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;