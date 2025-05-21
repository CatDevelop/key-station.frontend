import { apiDomain } from "@store/api";
import { customerControllerUpdate } from "@store/api/key-station-api.ts";
import { getAllCustomersFx } from "@store/customers/find-all.ts";
import { sample } from "effector";

export const updateCustomerFx = apiDomain.effect(customerControllerUpdate);

sample({
    clock: updateCustomerFx.doneData,
    fn: () => {},
    target: getAllCustomersFx,
});
