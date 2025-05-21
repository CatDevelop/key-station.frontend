import { Badge, Button, Card, CardContent, CardFooter } from "@pin-code/uikit.lib";
import { History, KeyRound, Lock, Unlock, User } from "lucide-react";
import { FC } from "react";

import { CreatedCell } from "@/model";

type Props = {
    cell: CreatedCell;
    onToggleLock: () => void;
    onViewLogs: () => void;
};

const CellCard: FC<Props> = ({ cell, onToggleLock, onViewLogs }) => {
    const isAvailable = cell.customerId === null;

    return (
        <Card
            className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
                isAvailable ? "!border-l-4 border-l-green-500" : "!border-l-4 border-l-red-500"
            }`}
        >
            <div className="p-4 flex justify-between items-center border-b">
                <div className="flex items-center gap-2">
                    <div
                        className={`p-2 rounded-full ${
                            isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                    >
                        <KeyRound className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-medium">Аудитория {cell.classroom}</h3>
                        <p className="text-xs text-gray-500">{cell.floor} этаж</p>
                    </div>
                </div>
                <Badge variant={isAvailable ? "success" : "destructive"} className="ml-auto">
                    {isAvailable ? "Доступен" : "Отсутствует"}
                </Badge>
            </div>
            <CardContent className="p-4 h-[100px]">
                {!isAvailable && cell.customerId && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>У: {cell.customer.name}</span>
                    </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                    <Badge
                        variant={cell.isLocked ? "outline" : "secondary"}
                        className={`gap-1 ${cell.isLocked ? "border-amber-500 text-amber-600" : "bg-teal-100 text-teal-700 border-none"}`}
                    >
                        {cell.isLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                        {cell.isLocked ? "Заблокирована" : "Разблокирована"}
                    </Badge>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 bg-gray-50 dark:bg-gray-800">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onViewLogs}
                    className="text-gray-600 border-gray-300 hover:bg-gray-100"
                >
                    <History className="h-4 w-4 mr-1" />
                    История
                </Button>
                <Button
                    variant={cell.isLocked ? "default" : "secondary"}
                    size="sm"
                    onClick={onToggleLock}
                    className={
                        cell.isLocked ? "bg-amber-500 hover:bg-amber-600" : "bg-teal-500 hover:bg-teal-600 text-white"
                    }
                >
                    {cell.isLocked ? <Unlock className="h-4 w-4 mr-1" /> : <Lock className="h-4 w-4 mr-1" />}
                    {cell.isLocked ? "Разблокировать" : "Заблокировать"}
                </Button>
            </CardFooter>
        </Card>
    );
};
export default CellCard;
