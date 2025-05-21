import { Typography } from "@components/Typography";
import { Badge, Button, Card, CardContent, CardHeader, Input } from "@pin-code/uikit.lib";
import { useEffect, useState } from "react";
import { GraduationCap, Pencil, Search, Trash2, User, UserCheck } from "lucide-react";
import { $customers, getAllCustomersFx } from "@store/customers/find-all.ts";
import { useUnit } from "effector-react";
import CreateCustomer from "@features/users/components/CreateCustomer";
import DeleteCustomer from "@features/users/components/DeleteCustomer";
import { removeCustomerFx } from "@store/customers/remove-customer.ts";
import UpdateCustomer from "@features/users/components/UpdateCustomer";
import { updateCustomerFx } from "@store/customers/update-customer.ts";

const UsersPage = () => {
    const [getAllCustomers] = useUnit([getAllCustomersFx]);
    const [removeCustomer] = useUnit([removeCustomerFx]);
    const [updateCustomer] = useUnit([updateCustomerFx]);
    const customers = useUnit($customers);

    const [searchTerm, setSearchTerm] = useState("");
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    // Edit user form state
    const [editUser, setEditUser] = useState({
        id: "",
        name: "",
        rfid: "",
        role: "TEACHER" as "TEACHER" | "STUDENT",
    });

    const filteredUsers = customers?.filter(
        (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.rfid.includes(searchTerm),
    );

    const handleEditUser = (userId: string) => {
        const user = customers?.find((u) => u.id === userId);

        if (user) {
            setEditUser({
                id: user.id,
                name: user.name,
                rfid: user.rfid,
                role: user.role as "TEACHER" | "STUDENT",
            });
            setIsEditUserOpen(true);
        }
    };

    const handleUpdateUser = () => {
        if (editUser.name && editUser.rfid && editUser.role) {
            updateCustomer(editUser);
            setIsEditUserOpen(false);
        }
    };

    const handleDeleteUser = (userId: string) => {
        setSelectedUserId(userId);
        setIsDeleteDialogOpen(true);
    };

    const confirmDeleteUser = () => {
        if (selectedUserId) {
            removeCustomer(selectedUserId);
            setIsDeleteDialogOpen(false);
            setSelectedUserId(null);
        }
    };

    useEffect(() => {
        getAllCustomers();
    }, [getAllCustomers]);

    return (
        <div className="flex-1 p-10 pt-10 mx-auto w-full">
            <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                    <Typography.H3>Пользователи</Typography.H3>
                    <Typography.Paragraph className="mb-5">Управление пользователями системы</Typography.Paragraph>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="w-full !flex gap-2 content-center items-center mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Поиск по имени или номеру пропуска..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="!pl-10"
                            />
                        </div>
                        <CreateCustomer isOpen={isAddUserOpen} setIsOpen={setIsAddUserOpen} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUsers && filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <Card key={user.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                    <div
                                        className={`h-2 ${user.role === "TEACHER" ? "bg-teal-500" : user.role === "ADMIN" ? "bg-red-500" : "bg-amber-500"}`}
                                    ></div>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`p-3 rounded-full ${
                                                    user.role === "teacher"
                                                        ? "bg-teal-100 text-teal-600"
                                                        : user.role === "ADMIN"
                                                          ? "bg-red-100 text-red-600"
                                                          : "bg-amber-100 text-amber-600"
                                                }`}
                                            >
                                                {user.role === "TEACHER" || user.role === "ADMIN" ? (
                                                    <UserCheck className="h-6 w-6" />
                                                ) : (
                                                    <GraduationCap className="h-6 w-6" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-lg">{user.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="outline" className="text-xs font-normal">
                                                        {user.rfid}
                                                    </Badge>
                                                    <Badge
                                                        variant="secondary"
                                                        className={`text-xs font-normal ${
                                                            user.role === "TEACHER"
                                                                ? "bg-teal-100 text-teal-700 hover:bg-teal-100"
                                                                : user.role === "ADMIN"
                                                                  ? "bg-red-100 text-red-700 hover:bg-red-100"
                                                                  : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                                        }`}
                                                    >
                                                        {user.role === "TEACHER"
                                                            ? "Преподаватель"
                                                            : user.role === "ADMIN"
                                                              ? "Администратор"
                                                              : "Студент"}
                                                    </Badge>
                                                </div>
                                                {user.role !== "ADMIN" && (
                                                    <div className="flex gap-2 mt-4">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleEditUser(user.id)}
                                                            className="text-gray-600 border-gray-300 hover:bg-gray-100"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5 mr-1" />
                                                            Изменить
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            className="text-red-600 border-red-200 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                                                            Удалить
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                                <User className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500">Пользователи не найдены</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <UpdateCustomer
                isOpen={isEditUserOpen}
                setIsOpen={setIsEditUserOpen}
                editUser={editUser}
                setEditUser={setEditUser}
                confirm={handleUpdateUser}
            />
            <DeleteCustomer isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen} confirm={confirmDeleteUser} />
        </div>
    );
};

export default UsersPage;
