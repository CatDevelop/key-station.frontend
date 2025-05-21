import { apiDomain } from "@store/api";
import { authControllerLogin } from "@store/api/key-station-api";

export const loginFx = apiDomain.effect(authControllerLogin);
