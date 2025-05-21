import { GalleryVerticalEnd } from "lucide-react";
import { loginFx } from "@store/auth/login";
import { setIsAuth, tokenReceived } from "@store/auth/token";
import { useToast } from "@pin-code/uikit.lib";

import { FullLoginPage } from "../../components/LoginPage";

const LoginPage = () => {
    const { toast } = useToast();
    return (
        <FullLoginPage
            type="email"
            title="👋 Добро пожаловать"
            image="https://images.unsplash.com/photo-1609770231080-e321deccc34c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2V5fGVufDB8fDB8fHww"
            description={`Административная панель для станции выдачи ключей`}
            logo={
                <>
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Станция выдачи ключей
                </>
            }
            onSubmit={(args) => {
                loginFx(args)
                    .then((response) => {
                        tokenReceived(response.accessToken);
                        setIsAuth(null);
                    })
                    .catch(() =>
                        toast({ id: "incorrectPassword", title: "Неверный логин или пароль!", variant: "destructive" }),
                    );
            }}
        />
    );
};

export { LoginPage };
