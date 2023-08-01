import {createEvent} from "effector";

export const changeThemeEvent = createEvent<"light" | "dark">();
export const changeCheckboxEvent = createEvent<boolean>();
export const changeSettingEvent = createEvent<boolean>();
export const changeViewEvent = createEvent<"tile" | "list">();
export const changeContainerEvent = createEvent<"xl" | "lg" | "md" | "full">();
