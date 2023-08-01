import {createStore} from "effector";
import {
    changeCheckboxEvent,
    changeContainerEvent,
    changeSettingEvent,
    changeThemeEvent,
    changeViewEvent
} from "@/model/theme/event";
import {loadState, saveState} from "@/utils/libs/localstorage";


export const initTheme: ThemeType = {
    mode: "light",
    view: "tile",
    container: "xl",
    checkbox: false,
    settings: true,
}

const initState = loadState("theme")

const $theme = createStore<ThemeType>(initState || initTheme)
    .on(changeThemeEvent, (theme, mode) => ({...theme, mode }))
    .on(changeSettingEvent, (theme, settings) => ({...theme, settings }))
    .on(changeCheckboxEvent, (theme, checkbox) => ({...theme, checkbox }))
    .on(changeViewEvent, (theme, view) => ({...theme, view }))
    .on(changeContainerEvent, (theme, container) => ({...theme, container }))


$theme.watch((state) => {
    saveState("theme", state)
})

export type ThemeType = {
    mode: "light" | "dark";
    view: "tile" | "list";
    container: "lg" | "md" | "xl" | "full";
    checkbox: boolean;
    settings: boolean;
}

export default $theme