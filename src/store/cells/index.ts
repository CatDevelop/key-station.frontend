import { apiDomain } from "@store/api";
import { cellControllerFindAll } from "@store/api/key-station-api.ts";
import { sample } from "effector";

import type { CreatedCell } from "@/model";

export const $cells = apiDomain.store<CreatedCell[] | null>(null);
export const setCells = apiDomain.event<CreatedCell[] | null>();

export const getAllCellsFX = apiDomain.effect(cellControllerFindAll);

$cells.on(setCells, (_, cells) => cells);

sample({
    clock: getAllCellsFX.doneData,
    fn: (response) => response!.cells,
    target: setCells,
});

export const $selectedFloor = apiDomain.store<string>("1");
export const setSelectedFloor = apiDomain.event<string>();

$selectedFloor.on(setSelectedFloor, (_, floor) => floor);
