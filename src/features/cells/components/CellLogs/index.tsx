import { Calendar, User } from "lucide-react";
import { $cellLogs } from "@store/logs/cellLogs.ts";
import { useUnit } from "effector-react";
import Loader from "@components/Loader";

import { ActionTypeEnum, LOGS_ACTION } from "@/types/logs.tsx";

export default function CellLogs() {
    const cellLogs = useUnit($cellLogs);

    if (!cellLogs) {
        return <Loader />;
    }

    return (
        <div className="space-y-2 max-h-[400px] overflow-y-auto p-1">
            {cellLogs.length > 0 ? (
                cellLogs.map((log) => (
                    <div
                        key={log.id}
                        className={`!flex items-center p-2 rounded-md border-l-4 ${LOGS_ACTION[log.action as ActionTypeEnum]?.color}`}
                    >
                        <div className="flex-shrink-0 p-1.5 rounded-full bg-white shadow-sm border mr-2">
                            {LOGS_ACTION[log.action as ActionTypeEnum]?.icon}
                        </div>

                        <div className="flex-grow grid grid-cols-1 sm:!grid-cols-3 gap-2 items-center text-sm">
                            <div className="font-medium">{LOGS_ACTION[log.action as ActionTypeEnum]?.text}</div>

                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-1 text-gray-400" />
                                <span className="truncate">{log.customer.name}</span>
                            </div>

                            <div className="flex items-center text-gray-500 justify-end">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{new Date(log.timestamp).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Записи не найдены</p>
                </div>
            )}
        </div>
    );
}
