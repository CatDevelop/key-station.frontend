import { KeyRound, Lock, Unlock } from "lucide-react";

export enum ActionTypeEnum {
    TAKEN = "TAKEN",
    RETURNED = "RETURNED",
    BLOCK = "BLOCK",
    UNBLOCK = "UNBLOCK",
}

export const LOGS_ACTION = {
    [ActionTypeEnum.TAKEN]: {
        icon: <KeyRound className="h-5 w-5 text-blue-500" />,
        color: "bg-blue-50 border-blue-200 text-blue-700",
        text: "Взятие ключа",
    },
    [ActionTypeEnum.RETURNED]: {
        icon: <KeyRound className="h-5 w-5 text-green-500" />,
        color: "bg-green-50 border-green-200 text-green-700",
        text: "Возврат ключа",
    },
    [ActionTypeEnum.BLOCK]: {
        icon: <Lock className="h-5 w-5 text-amber-500" />,
        color: "bg-amber-50 border-amber-200 text-amber-700",
        text: "Блокировка ячейки",
    },
    [ActionTypeEnum.UNBLOCK]: {
        icon: <Unlock className="h-5 w-5 text-teal-500" />,
        color: "bg-teal-50 border-teal-200 text-teal-700",
        text: "Разблокировка ячейки",
    },
};
