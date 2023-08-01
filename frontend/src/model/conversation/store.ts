import {createStore} from "effector";
import { v4 as uuid } from 'uuid';
import {getPromptsFx, initMessagesFx} from "./effect";
import {
    addMessageEvent,
    deleteAllMessageEvent,
    deleteMessageEvent,
    deleteMultiMessagesEvent, selectPromptEvent,
    updateMessageEvent
} from "./event";

const initConversation: ConversationType = {
    messages: [],
    prompts: [],
    prompt: "",
    id: uuid(),
    userTitle: "demo",
    autoTitle: "demo",
    tokenCount: 0,
    created: Date.now(),
    updated: Date.now()
}

const $conversation = createStore<ConversationType>(initConversation)
    .on(initMessagesFx.doneData, (conversation, messages) => ({...conversation, messages }))
    .on(getPromptsFx.doneData, (conversation, prompts) => ({...conversation, prompts}))
    .on(addMessageEvent, (conversation, message) => ({...conversation, messages: [message, ...conversation.messages] }))
    .on(deleteMultiMessagesEvent, (conversation, keys) => ({...conversation, messages: conversation.messages.filter((i)=>!keys.includes(i.id)) }))
    .on(deleteAllMessageEvent, (conversation, _) => ({...conversation, messages: [] }))
    .on(deleteMessageEvent, (conversation, message) => ({...conversation, messages: conversation.messages.filter((msg)=>msg.id !== message.id) }))
    .on(updateMessageEvent, (conversation, message) => ({...conversation, messages: conversation.messages.map((msg) => {
        if(msg.id === message.id) {
            return message
        } else {
            return msg
        }
        })
    }))
    .on(selectPromptEvent, (conversation, prompt) =>({...conversation, prompt}))

export type MessageType = {
    id: string;
    text: string;
    prompt: string;
    sender: "you" | "bot" | string;
    avatar: string | null;
    typing: boolean;
    like: 0 | 1 | -1;
    role: 'assistant' | 'system' | 'user';
    tokenCount: number;
    created: number;
    updated: number | null;
}

export type PromptType = {
    id: string;
    key: string;
    title: string;
    photo: string;
}

export type ConversationType = {
    id: string;
    messages: MessageType[];
    prompts: PromptType[];
    prompt: string;
    userTitle?: string;
    autoTitle?: string;
    tokenCount: number;
    created: number;
    updated: number | null;
}

export default $conversation