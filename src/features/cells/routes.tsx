import { ConfigRouteProps } from "@router/types";
import CellsPage from "@features/cells/pages/CellsPage";

export const CellsRouter = {
    CellsPage: "/cells",
};

export const cellsRouteConfig: ConfigRouteProps[] = [
    {
        path: CellsRouter.CellsPage,
        element: <CellsPage />,
        withAuthGuard: true,
    },
];
