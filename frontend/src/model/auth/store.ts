import {createStore} from "effector";
import {loginEvent, logoutEvent} from "@/model/auth/event";
import {loadState, saveState} from "@/utils/libs/localstorage";
import {loginFx, logoutFx, signFx, updateProfileFx} from "@/model/auth/effect";
import {UserType} from "@/utils/types/user.type";

const initAuth: AuthType = {
    role: "user",
    isAuth: false,
    token: null,
    username: "",
    password: "",
    user: {}
}

const initState = loadState("auth");

const $auth = createStore(initState || initAuth)
    .on(loginEvent, (auth, newAuth) => ({...auth, ...newAuth}))
    .on(logoutEvent, () => ({...initAuth}))
    .on(updateProfileFx.doneData, (state, data) => ({...state, user: {...state.user, ...data}}))
    .on(loginFx.doneData, (state, data) => ({...state, user: data.user, token: data.access_token, isAuth: Boolean(data.access_token)}))
    .on(signFx.doneData, (state, data: any) => ({...state, user: data.user, token: data.access_token, isAuth: Boolean(data.access_token)}))
    .on(logoutFx.doneData, (state, data) => ({...initAuth}))


export type AuthType = {
    role: "user" | "admin";
    isAuth: boolean;
    token: string | null;
    username: string;
    password: string;
    user: UserType | {}
}


$auth.watch((state) => {
    saveState("auth", state)
})

export default $auth