import axios from "axios";
import {logoutEvent} from "@/model/auth/event";

const api = axios.create({
    baseURL: process.env.API_ENDPOINT || "/api",
})

const chat = axios.create({
    baseURL: process.env.FLOWISE_ENDPOINT || "http://localhost:3001/api/v1/prediction/"
})

const config = async () => {
    const token = await localStorage.getItem("auth_token")

    return {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
}

const upload = async () => {
    const token = await localStorage.getItem("auth_token")

    return {
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'multipart/form-data'
        }
    }
}

export const initApi = async () => api.post("/init")
export const chatApi = async (data: { question: string }, key: string) => api.post(`/chat/${key}`, data,);
export const docsApi = async () => api.get("/docs")
export const deleteDocApi = async (name: string) => api.delete(`/docs/${name}`)
export const uploadDocApi = async (formData: any) => api.post("/docs/upload", formData, {headers: {'Content-Type': 'multipart/form-data'}})

// ADMIN
export const loginApi = async (data: any) => api.post("/auth/login", data)
export const registerApi = async (data: any) => api.post("/auth/register", data)
export const verifyApi = async (token: string) => api.post("/auth/verify", {token});
export const forgetPasswordApi = async (email: string) => api.post("/auth/forget", {email})
export const resetPasswordApi = async (token: string, newPass: string) => api.post("/auth/reset", {token, newPass});
export const updateProfileApi = async (file: FormData) => api.post("/auth/update", file, {...await upload()})


export const usersApi = async () => api.get("/user", {...await config()})
export const createUserApi = async (data: any) => api.post("/user", data, {...await config()})
export const updateUserApi = async (data: any) => api.post("/user/update", data, {...await config()})
export const deleteUserApi = async (id: string) => api.delete(`/user/${id}`, {...await config()})
export const createPromptApi = async (data: any) => api.post("/prompt", data, {...await config()})
export const promptsApi = async () => api.get("/prompt", {...await config()}).catch((e) => {
    if(e?.response?.status === 401) {
        logoutEvent()
    }
})
export const deletePromptApi = async (id: string) => api.delete(`/prompt/${id}`, {...await config()})
export const updatePromptApi = async (data: any) => api.post(`/prompt/update`, data, {...await config()})

export const updateSettingApi = async (data: any) => api.post("/setting/update", data, {...await config()})
export const getSettingApi = async () => api.get("/setting", {...await config()});

// FEED BACK
export const createFeedbackApi = async (payload: any) => api.post("/feedback/create", payload, {...await config()})
export const getFeedbacksApi = async () =>api.get("/feedback", {...await config()})