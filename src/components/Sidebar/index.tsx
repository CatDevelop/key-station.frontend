import { ClipboardCheck, KeyIcon, KeyRound, LogOut, Users } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@pin-code/uikit.lib";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HomeRouter } from "@router/routes";
import { LogsRouter } from "@features/logs";
import { CellsRouter } from "@features/cells";
import { logout } from "@store/auth/logout.ts";
import { UsersRouter } from "@features/users";

const navItems = [
    {
        title: "Ячейки ключей",
        url: CellsRouter.CellsPage,
        icon: <KeyRound size={16} />,
        isActive: true,
    },
    {
        title: "Журнал событий",
        url: LogsRouter.LogsPage,
        icon: <ClipboardCheck size={16} />,
        isActive: false,
    },
    {
        title: "Пользователи",
        url: UsersRouter.UsersPage,
        icon: <Users size={16} />,
        isActive: false,
    },
];

const AppSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Sidebar collapsible="icon" className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row">
            <Sidebar collapsible="none" className="!w-[calc(var(--sidebar-width))] border-r py-1">
                <SidebarHeader className="mt-3 mb-3">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild className="md:!h-12">
                                <Link to={HomeRouter.HomePage}>
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <KeyIcon className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Станция выдачи ключей</span>
                                        <span className="truncate text-xs">Админ-панель</span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:!px-0">
                            <SidebarMenu>
                                {navItems.map((item) => {
                                    const isActive = location.pathname.startsWith(item.url);
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton isActive={isActive} onClick={() => navigate(item.url)}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="gap-4 mb-1">
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => logout()}>
                            <LogOut />
                            Выйти
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarFooter>
            </Sidebar>
        </Sidebar>
    );
};

export { AppSidebar };
