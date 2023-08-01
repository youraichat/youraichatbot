import {createStore} from "effector";
import {changeSettingsEvent} from "@/model/settings/event";
import {loadState, saveState} from "@/utils/libs/localstorage";

export const initSettings: SettingsType = {
    language: "en-US",
    enter: true,
    shortKey: true
}

const initState = loadState("settings");

const $settings = createStore(initState || initSettings)
    .on(changeSettingsEvent, (settings, newSettings) => ({...settings, ...newSettings}))


export type SettingsType = {
    language: string;
    enter: boolean;
    shortKey: boolean;
}

$settings.watch((state) => {
    saveState("settings", state)
})

export default $settings;
