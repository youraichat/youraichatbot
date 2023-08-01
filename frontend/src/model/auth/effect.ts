import {createEffect} from "effector/effector.umd";
import {loginApi, updateProfileApi} from "@/api";

export const loginFx = createEffect(async ({email, password}: { email: string; password: string }) => {
    try {
        const {data} = await loginApi({email, password})
        localStorage.setItem("auth_token", data.access_token)
        return data
    } catch (e) {
        console.warn(e)
    }
})

export const signFx = createEffect(async ({access_token, user}: {access_token: string, user: any}) => {
    try {
        localStorage.setItem("auth_token", access_token);
        return {
            access_token,
            user
        }
    } catch (e) {
        console.warn(e)
    }
})

export const logoutFx = createEffect(async () => {
    try {
        localStorage.removeItem("auth_token")
        return true
    } catch (e) {
        console.warn(e)
    }
})

export const updateProfileFx = createEffect(async (formData: FormData) =>{
    const {data} = await updateProfileApi(formData);
    return data
})
