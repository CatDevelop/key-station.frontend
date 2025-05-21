import { Navigate } from "react-router-dom";
import Layout from "@components/Layout";
import { authRouteConfig } from "@features/auth";
import { cellsRouteConfig, CellsRouter } from "@features/cells";
import { logsRouteConfig } from "@features/logs";
import { usersRouteConfig } from "@features/users";

import { ConfigRouteProps } from "./types";

export const HomeRouter = {
    HomePage: CellsRouter.CellsPage,
};

export const homeRouteConfig: ConfigRouteProps[] = [
    {
        path: "/",
        element: <Navigate to={CellsRouter.CellsPage} />,
        withAuthGuard: true,
    },
];

export const routeConfig: ConfigRouteProps[] = [
    ...authRouteConfig,
    ...homeRouteConfig,
    {
        path: "",
        element: <Layout />,
        children: [...cellsRouteConfig, ...logsRouteConfig, ...usersRouteConfig],
        withAuthGuard: true,
    },
    {
        path: "*",
        element: <div>error</div>,
    },
];
