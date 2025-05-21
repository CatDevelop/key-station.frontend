import { SidebarProvider } from "@pin-code/uikit.lib";
import { AppSidebar } from "@components/Sidebar";
import { Outlet } from "react-router-dom";
import { CSSProperties } from "react";

const Layout = () => {
    return (
        <SidebarProvider style={{ "--sidebar-width": "280px" } as CSSProperties}>
            <AppSidebar />
            <main className="w-full">
                <Outlet />
            </main>
        </SidebarProvider>
    );
};

export default Layout;
