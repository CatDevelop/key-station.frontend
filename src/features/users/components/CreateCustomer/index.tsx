import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    useToast,
} from "@pin-code/uikit.lib";
import { UserPlus } from "lucide-react";
import { FC, useState } from "react";
import { createCustomerFx } from "@store/customers/create-customer.ts";

type Props = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
};

const CreateCustomer: FC<Props> = ({ isOpen, setIsOpen }) => {
    const { toast } = useToast();
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        rfid: "",
        role: "TEACHER" as "TEACHER" | "STUDENT",
    });

    const handleAddUser = () => {
        if (newCustomer.name && newCustomer.rfid && newCustomer.role) {
            createCustomerFx({
                name: newCustomer.name,
                rfid: newCustomer.rfid,
                role: newCustomer.role,
            }).then(() => {
                toast({ title: "Пользователь успешно добавлен!" });
            });

            setNewCustomer({
                name: "",
                rfid: "",
                role: "TEACHER",
            });

            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-indigo-500 hover:bg-indigo-600">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Добавить пользователя
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить нового пользователя</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">ФИО</Label>
                        <Input
                            id="name"
                            value={newCustomer.name}
                            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="rfid">Номер пропуска</Label>
                        <Input
                            id="rfid"
                            value={newCustomer.rfid}
                            onChange={(e) => setNewCustomer({ ...newCustomer, rfid: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Роль</Label>
                        <Select
                            value={newCustomer.role}
                            onValueChange={(value: "TEACHER" | "STUDENT") =>
                                setNewCustomer({ ...newCustomer, role: value })
                            }
                        >
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Выберите роль" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TEACHER">Преподаватель</SelectItem>
                                <SelectItem value="STUDENT">Студент</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleAddUser} className="bg-teal-500 hover:bg-teal-600">
                        Добавить
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCustomer;
