import { ConfigRouteProps } from "@router/types";
import LogsPage from "@features/logs/pages/LogsPage";

export const LogsRouter = {
    LogsPage: "/logs",
};

export const logsRouteConfig: ConfigRouteProps[] = [
    {
        path: LogsRouter.LogsPage,
        element: <LogsPage />,
        withAuthGuard: true,
    },
];
