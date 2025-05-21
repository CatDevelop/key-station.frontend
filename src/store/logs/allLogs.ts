import { apiDomain } from "@store/api";
import { sample } from "effector";
import { keyLogControllerFindAll } from "@store/api/key-station-api.ts";

import { type FindAllLogResponseDto } from "@/model";

export const getAllLogsFx = apiDomain.effect(keyLogControllerFindAll);
export const $allLogs = apiDomain.store<FindAllLogResponseDto[] | null>(null);
export const setAllLogs = apiDomain.event<FindAllLogResponseDto[] | null>();

$allLogs.on(setAllLogs, (_, logs) => logs);

sample({
    clock: getAllLogsFx.doneData,
    fn: (response) => response.logs,
    target: setAllLogs,
});
