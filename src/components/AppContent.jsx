import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

export default function AppContent() {
    return(
        <div className="app-content">
            <AppHeader />
            <div className="page-content">
                <Outlet />
            </div>
        </div>
    )
}