import { FC, PropsWithChildren, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useUnit } from "effector-react";
import { Loader } from "lucide-react";
import { $isAuth, $token, checkTokenFx, setIsAuth } from "@store/auth/token";
import { AuthRouter } from "@features/auth";

import { HomeRouter } from "./routes";

type Props = PropsWithChildren & {
    withAuthGuard: boolean | undefined;
    withNoAuthGuard: boolean | undefined;
};

export const ProtectRoute: FC<Props> = ({ withAuthGuard, withNoAuthGuard, children }) => {
    const isAuth = useUnit($isAuth);
    const token = useUnit($token);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await checkTokenFx();
                setIsAuth(!!response);
            } catch {
                setIsAuth(false);
            }
        };

        if (isAuth === null) verifyToken();
    }, [isAuth, token]);

    // Если есть токен, но ещё не проверили его
    if (isAuth === null) {
        return <Loader className="animate-spin top-[50%] left-[50%] absolute" />;
    }

    // Если нужна авторизация, но пользователь не авторизован
    if (withAuthGuard && !isAuth) {
        const returnUrl = encodeURIComponent(`${window.location.pathname}${window.location.search}`);
        return <Navigate to={`${AuthRouter.LoginPage}?ReturnUrl=${returnUrl}`} />;
    }

    // Если должен быть не авторизован, но пользователь уже вошёл в аккаунт
    if (withNoAuthGuard && isAuth) {
        const returnUrl = decodeURIComponent(searchParams.get("ReturnUrl") || HomeRouter.HomePage);
        return <Navigate to={returnUrl} />;
    }

    return children;
};
