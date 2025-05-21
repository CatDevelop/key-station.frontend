import { Typography } from "@components/Typography";
import CellCard from "@features/cells/components/CellCard";
import {
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    useToast,
} from "@pin-code/uikit.lib";
import { useEffect } from "react";
import { $cells, $selectedFloor, getAllCellsFX, setSelectedFloor } from "@store/cells";
import { useUnit } from "effector-react/effector-react.mjs";
import Loader from "@components/Loader";
import { blockCellFx, unblockCellFx } from "@store/cells/block.ts";
import { $selectedCell, setCellLogs, setSelectedCell } from "@store/logs/cellLogs.ts";
import CellLogs from "@features/cells/components/CellLogs";

import { FLOORS } from "@/types/floors.ts";

const CellsPage = () => {
    const { toast } = useToast();
    const [getCells, isLoadingCells] = useUnit([getAllCellsFX, getAllCellsFX.pending]);
    const blockCell = useUnit(blockCellFx);
    const unblockCell = useUnit(unblockCellFx);
    const cells = useUnit($cells);
    const selectedFloor = useUnit($selectedFloor);
    const selectedCell = useUnit($selectedCell);

    const toggleCellLock = (id: string) => {
        const cell = cells!.find((cell) => cell.id === id);
        if (cell?.isLocked) unblockCell(cell!.id).then(() => toast({ title: "Ячейка успешно разблокирована!" }));
        else blockCell(cell!.id).then(() => toast({ title: "Ячейка успешно заблокирована!" }));
    };

    useEffect(() => {
        getCells();
    }, [getCells]);

    if (!cells && isLoadingCells) return <Loader />;

    return (
        <div className="flex-1 p-10 pt-10 mx-auto w-full">
            <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
                    <Typography.H3>Ячейки ключей</Typography.H3>
                    <Typography.Paragraph className="mb-5">Управление ячейками ключей по этажам</Typography.Paragraph>
                </CardHeader>
                <CardContent className="p-6">
                    {cells && (
                        <Tabs value={selectedFloor} onValueChange={(value) => setSelectedFloor(value)}>
                            <TabsList className="mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                                {FLOORS.map((floor) => (
                                    <TabsTrigger
                                        key={floor}
                                        value={floor.toString()}
                                        className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
                                    >
                                        {floor} этаж
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {FLOORS.map((floor) => (
                                <TabsContent key={floor} value={floor.toString()}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {cells!
                                            .filter((cell) => cell.floor.toString() === floor)
                                            .map((cell) => (
                                                <CellCard
                                                    key={cell.id}
                                                    cell={cell}
                                                    onToggleLock={() => toggleCellLock(cell.id)}
                                                    onViewLogs={() => setSelectedCell(cell)}
                                                />
                                            ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    )}
                </CardContent>
            </Card>

            <Dialog
                open={!!selectedCell}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedCell(null);
                        setCellLogs([]);
                    }
                }}
            >
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>
                            Журнал для ячейки {selectedCell?.classroom} ({selectedCell?.floor} этаж)
                        </DialogTitle>
                    </DialogHeader>
                    {selectedCell && <CellLogs />}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CellsPage;
