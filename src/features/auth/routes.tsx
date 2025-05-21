import { ConfigRouteProps } from "@router/types";

import { LoginPage } from "./pages/LoginPage";

export const AuthRouter = {
    LoginPage: "/auth/login",
};

export const authRouteConfig: ConfigRouteProps[] = [
    {
        path: AuthRouter.LoginPage,
        element: <LoginPage />,
        withNoAuthGuard: true,
    },
];
