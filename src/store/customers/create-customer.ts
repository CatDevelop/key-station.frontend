import { apiDomain } from "@store/api";
import { customerControllerCreate } from "@store/api/key-station-api.ts";
import { getAllCustomersFx } from "@store/customers/find-all.ts";
import { sample } from "effector";

export const createCustomerFx = apiDomain.effect(customerControllerCreate);

sample({
    clock: createCustomerFx.doneData,
    fn: () => {},
    target: getAllCustomersFx,
});
