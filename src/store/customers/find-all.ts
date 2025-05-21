import { apiDomain } from "@store/api";
import { customerControllerFindAll } from "@store/api/key-station-api.ts";
import { sample } from "effector";

import type { CreatedCustomerDto } from "@/model";

export const $customers = apiDomain.store<CreatedCustomerDto[] | null>(null);
export const setCustomers = apiDomain.event<CreatedCustomerDto[] | null>();

export const getAllCustomersFx = apiDomain.effect(customerControllerFindAll);

$customers.on(setCustomers, (_, customers) => customers);

sample({
    clock: getAllCustomersFx.doneData,
    fn: (response) => response!.customers,
    target: setCustomers,
});
