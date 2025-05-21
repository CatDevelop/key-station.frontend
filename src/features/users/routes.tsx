import { ConfigRouteProps } from "@router/types";

import UsersPage from "./pages/UsersPage";

export const UsersRouter = {
    UsersPage: "/users",
};

export const usersRouteConfig: ConfigRouteProps[] = [
    {
        path: UsersRouter.UsersPage,
        element: <UsersPage />,
        withAuthGuard: true,
    },
];
