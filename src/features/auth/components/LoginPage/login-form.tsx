import { Button, Input, Label } from "@pin-code/uikit.lib";
import { ComponentProps, useState } from "react";

type LoginFormProps = Omit<ComponentProps<"div">, "onSubmit"> & {
    title: string;
    description: string;
    type: "login" | "email";
    onSubmit: ({ email, password, login }: { email: string; password: string; login: string }) => void;
};

const LoginForm = ({ title, description, type, onSubmit }: LoginFormProps) => {
    const [email, setEmail] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <form
            className="p-6 md:p-8"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit({ email, password, login });
            }}
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-balance text-muted-foreground whitespace-pre-wrap">{description}</p>
                </div>
                {type === "login" && (
                    <div className="grid gap-2">
                        <Label htmlFor="email">Логин</Label>
                        <Input
                            id="login"
                            type="text"
                            placeholder="test"
                            required
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                )}
                {type === "email" && (
                    <div className="grid gap-2">
                        <Label htmlFor="email">Почта</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="test@mail.ru"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                )}
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Пароль</Label>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="****"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Войти
                </Button>
            </div>
        </form>
    );
};

export { LoginForm, type LoginFormProps };
