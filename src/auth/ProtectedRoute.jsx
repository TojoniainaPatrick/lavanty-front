import { useLocation, Navigate, Outlet } from "react-router-dom";
import AppSideBar from "../components/AppSideBar";
import AppHeader from "../components/AppHeader";

const AdminStack = () => {
    return(
        <div className="main-container">
            <AppSideBar />
            <div className="page-content">
                <AppHeader />
                <div className="page-body">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

const ProtectedRoute = ({ allowedRoles }) => {
    // const user = JSON.parse(localStorage.getItem('user'))
    // const userRole = user?.userRole

    // const location = useLocation()
    
    return (
        <AdminStack />
    //     allowedRoles?.find( allowedRole => allowedRole == userRole )
    //         ? <AdminStack />
    //         : user
    //             ? <Navigate to="/denied"  state={{ from: location }} replace />
    //             : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default ProtectedRoute;