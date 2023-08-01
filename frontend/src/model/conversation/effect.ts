import {createEffect} from "effector";
import {HistoryHelper} from "./historyHelper";
import {MessageType, PromptType} from "./store";
import {
    addMessageEvent,
    deleteAllMessageEvent,
    deleteMessageEvent,
    deleteMultiMessagesEvent,
    updateMessageEvent
} from "./event";
import {v4 as uuid} from "uuid";
import {chatApi, promptsApi} from "@/api";

const historyHelper = new HistoryHelper();

export const addMessageFx = createEffect(async (prop: {message: string, prompt: string}) => {
    const msg: MessageType = {
        id: uuid(),
        text: prop.message,
        sender: "you",
        prompt: prop.prompt,
        avatar: "",
        typing: false,
        like: 0,
        role: 'user',
        tokenCount: 0,
        created: Date.now(),
        updated: Date.now()
    }

    addMessageEvent(msg);
    await historyHelper.addConversationHistory(msg);

    const bot: MessageType = {
        id: uuid(),
        text: "",
        sender: "bot",
        prompt: prop.prompt,
        avatar: "",
        typing: true,
        like: 0,
        role: 'assistant',
        tokenCount: 0,
        created: Date.now(),
        updated: Date.now()
    }
    addMessageEvent(bot);
    await historyHelper.addConversationHistory(bot);

    try {
        const {data} = await chatApi({question: prop.message}, prop.prompt);

        updateMessageEvent({
            ...bot,
            text: data.message.replace("\n", "") || "",
            like: 0,
            typing: false,
            updated: Date.now()
        })

        await historyHelper.updateConversationHistory({
            ...bot,
            text: data.message?.replace("\n", "") || "",
            like: 0,
            typing: false,
            updated: Date.now()
        });
    } catch (e: any) {
        updateMessageEvent({
            ...bot,
            text: e.response?.data?.message || "",
            like: 0,
            typing: false,
            updated: Date.now()
        })

        await historyHelper.updateConversationHistory({
            ...bot,
            text: "Sorry, I can't find any information about that question.  Try being a bit more specific.",
            like: 0,
            typing: false,
            updated: Date.now()
        });
    }
})

export const updateMessageFx = createEffect(async (msg: MessageType) => {
    updateMessageEvent({...msg})
    await historyHelper.updateConversationHistory(msg)
})

export const deleteMessageFx = createEffect(async (msg: MessageType) => {
    deleteMessageEvent(msg);
    await historyHelper.deleteConversationHistory(msg);
})

export const deleteMultiMessagesFx = createEffect(async (keys: string[]) => {
    deleteMultiMessagesEvent(keys)
    await historyHelper.deleteMultiConversationHistory(keys)
})

export const deleteAllMessageFx = createEffect(async () => {
    deleteAllMessageEvent()
    await historyHelper.deleteAllConversationHistory();
})

export const initMessagesFx = createEffect(async (): Promise<MessageType[]> => {
    return await historyHelper.getConversationsHistory()
})

export const getPromptsFx = createEffect(async (): Promise<PromptType[]> =>{
    console.log("RUNNING...")

    const {data}: any = await promptsApi()


    return data.map((d: any) =>({
        id: d.id,
        key: d.key,
        title: d.title,
        photo: d.photo
    }))
})