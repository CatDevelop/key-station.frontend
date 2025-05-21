import { apiDomain } from "@store/api";
import { cellControllerBlock, cellControllerUnblock } from "@store/api/key-station-api.ts";
import { getAllCellsFX } from "@store/cells/index.ts";
import { sample } from "effector";

export const blockCellFx = apiDomain.effect(cellControllerBlock);
export const unblockCellFx = apiDomain.effect(cellControllerUnblock);

sample({
    clock: blockCellFx.doneData,
    fn: () => {},
    target: getAllCellsFX,
});

sample({
    clock: unblockCellFx.doneData,
    fn: () => {},
    target: getAllCellsFX,
});
