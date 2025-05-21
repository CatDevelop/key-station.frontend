import { apiDomain } from "@store/api";
import { sample } from "effector";
import { keyLogControllerFindAll } from "@store/api/key-station-api.ts";

import { CreatedCell, type FindAllLogResponseDto } from "@/model";

export const $selectedCell = apiDomain.store<CreatedCell | null>(null);
export const setSelectedCell = apiDomain.event<CreatedCell | null>();

$selectedCell.on(setSelectedCell, (_, cell) => cell);

export const getCellLogs = apiDomain.effect(keyLogControllerFindAll);
export const $cellLogs = apiDomain.store<FindAllLogResponseDto[] | null>(null);
export const setCellLogs = apiDomain.event<FindAllLogResponseDto[] | null>();

$cellLogs.on(setCellLogs, (_, logs) => logs);

sample({
    clock: $selectedCell,
    filter: (clock) => !!clock,
    fn: (clock) => ({ cellId: clock?.id as string }),
    target: getCellLogs,
});

sample({
    clock: getCellLogs.doneData,
    fn: (response) => response.logs,
    target: setCellLogs,
});
