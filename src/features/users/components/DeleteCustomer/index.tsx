import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@pin-code/uikit.lib";
import { FC } from "react";

type Props = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    confirm: () => void;
};

const DeleteCustomer: FC<Props> = ({ isOpen, setIsOpen, confirm }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Подтверждение удаления</AlertDialogTitle>
                    <AlertDialogDescription>
                        Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={confirm} className="bg-red-500 hover:bg-red-600">
                        Удалить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteCustomer;
