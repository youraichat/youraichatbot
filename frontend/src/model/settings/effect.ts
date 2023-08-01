import {createEffect} from "effector";
import {loadState} from "@/utils/libs/localstorage";
import {initSettings} from "./store";

const initSettingsFx = createEffect(async () => {
    try {
        return await loadState("settings")
    } catch (e) {
        return initSettings
    }
})

export default initSettingsFx