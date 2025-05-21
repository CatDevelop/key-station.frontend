import { apiDomain } from "@store/api";
import { customerControllerRemove } from "@store/api/key-station-api.ts";
import { getAllCustomersFx } from "@store/customers/find-all.ts";
import { sample } from "effector";

export const removeCustomerFx = apiDomain.effect(customerControllerRemove);

sample({
    clock: removeCustomerFx.doneData,
    fn: () => {},
    target: getAllCustomersFx,
});
