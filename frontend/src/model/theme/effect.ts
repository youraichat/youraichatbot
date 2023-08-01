import {createEffect} from "effector";
import {loadState} from "@/utils/libs/localstorage";
import {initTheme} from "./store";

const initThemeFx = createEffect(async () => {
    try {
        return loadState("theme")
    } catch (e) {
        return initTheme
    }
})

export default initThemeFx