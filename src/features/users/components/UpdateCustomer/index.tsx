import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@pin-code/uikit.lib";
import { FC } from "react";

type Props = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    editUser: { id: string; name: string; rfid: string; role: "TEACHER" | "STUDENT" };
    setEditUser: React.Dispatch<
        React.SetStateAction<{
            id: string;
            name: string;
            rfid: string;
            role: "TEACHER" | "STUDENT";
        }>
    >;
    confirm: () => void;
};

const UpdateCustomer: FC<Props> = ({ isOpen, setIsOpen, editUser, setEditUser, confirm }) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать пользователя</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-fullName">ФИО</Label>
                        <Input
                            id="edit-fullName"
                            value={editUser.name}
                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-cardNumber">Номер пропуска</Label>
                        <Input
                            id="edit-cardNumber"
                            value={editUser.rfid}
                            onChange={(e) => setEditUser({ ...editUser, rfid: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-role">Роль</Label>
                        <Select
                            value={editUser.role}
                            onValueChange={(value: "TEACHER" | "STUDENT") => setEditUser({ ...editUser, role: value })}
                        >
                            <SelectTrigger id="edit-role">
                                <SelectValue placeholder="Выберите роль" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TEACHER">Преподаватель</SelectItem>
                                <SelectItem value="STUDENT">Студент</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={confirm} className="bg-teal-500 hover:bg-teal-600">
                        Сохранить изменения
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateCustomer;
