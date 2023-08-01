import {createEvent} from "effector";
import {AuthType} from "./store";

export const loginEvent = createEvent<{isAuth: boolean; token: string}>();
export const logoutEvent = createEvent()
