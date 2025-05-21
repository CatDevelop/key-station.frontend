import { Typography } from "@components/Typography";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    useToast,
} from "@pin-code/uikit.lib";
import { useCallback, useEffect, useState } from "react";
import { Calendar, MapPin, RefreshCcw, User, UserPlus } from "lucide-react";
import { $allLogs, getAllLogsFx } from "@store/logs/allLogs.ts";
import { useUnit } from "effector-react";

import { ActionTypeEnum, LOGS_ACTION } from "@/types/logs.tsx";
import { FLOORS } from "@/types/floors.ts";

const LogsPage = () => {
    const { toast } = useToast();
    const [getAllLogs, isLoadingLogs] = useUnit([getAllLogsFx, getAllLogsFx.pending]);
    const allLogs = useUnit($allLogs);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterFloor, setFilterFloor] = useState<string>("all");
    const [filterAction, setFilterAction] = useState<string>("all");

    const filteredLogs = allLogs?.filter((log) => {
        const matchesSearch =
            log.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.cell.classroom.toString().toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFloor = filterFloor === "all" || log.cell.floor.toString() === filterFloor;
        const matchesAction = filterAction === "all" || log.action === filterAction;

        return matchesSearch && matchesFloor && matchesAction;
    });

    const refreshData = useCallback(
        () =>
            getAllLogs().then(() => {
                toast({ title: "Данные успешно обновлены!" });
            }),
        [getAllLogs, toast],
    );

    useEffect(() => {
        getAllLogs();
    }, [getAllLogs]);

    return (
        <div className="flex-1 p-10 pt-10 mx-auto w-full">
            <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                    <Typography.H3>Журнал событий</Typography.H3>
                    <Typography.Paragraph className="mb-5">История всех действий с ключами</Typography.Paragraph>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col md:!flex-row gap-4 mb-6 items-center">
                        <Input
                            placeholder="Поиск по имени или номеру аудитории..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="md:!w-1/3"
                        />

                        <Select value={filterFloor} onValueChange={setFilterFloor}>
                            <SelectTrigger className="md:!w-1/4">
                                <SelectValue placeholder="Этаж" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все этажи</SelectItem>
                                {FLOORS.map((floor) => (
                                    <SelectItem key={floor} value={floor.toString()}>
                                        {floor} этаж
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filterAction} onValueChange={setFilterAction}>
                            <SelectTrigger className="md:!w-1/4">
                                <SelectValue placeholder="Действие" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все действия</SelectItem>
                                <SelectItem value={ActionTypeEnum.TAKEN}>Взятие ключа</SelectItem>
                                <SelectItem value={ActionTypeEnum.RETURNED}>Возврат ключа</SelectItem>
                                <SelectItem value={ActionTypeEnum.BLOCK}>Блокировка ячейки</SelectItem>
                                <SelectItem value={ActionTypeEnum.UNBLOCK}>Разблокировка ячейки</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button className="bg-blue-500 hover:bg-blue-600" onClick={refreshData}>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Обновить данные
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {filteredLogs && filteredLogs.length > 0 ? (
                            filteredLogs.map((log) => (
                                <div
                                    key={log.id}
                                    className={`flex items-center p-3 rounded-md border-l-4 ${LOGS_ACTION[log.action as ActionTypeEnum]?.color}`}
                                >
                                    <div className="flex-shrink-0 p-2 rounded-full bg-white shadow-sm border mr-3">
                                        {LOGS_ACTION[log.action as ActionTypeEnum]?.icon}
                                    </div>

                                    <div className="flex-grow grid grid-cols-1 md:!grid-cols-12 gap-2 items-center text-sm">
                                        <div className="font-medium md:!col-span-3">
                                            {LOGS_ACTION[log.action as ActionTypeEnum]?.text}
                                        </div>

                                        <div className="flex items-center md:!col-span-3">
                                            <User className="h-4 w-4 mr-1 text-gray-400" />
                                            <span className="truncate">{log.customer.name}</span>
                                        </div>

                                        <div className="flex items-center md:!col-span-3">
                                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                            <span>
                                                Ауд. {log.cell.classroom}, {log.cell.floor} эт.
                                            </span>
                                        </div>

                                        <div className="flex items-center text-gray-500 md:!col-span-3 justify-end">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span>{new Date(log.timestamp).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Записи не найдены</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LogsPage;
