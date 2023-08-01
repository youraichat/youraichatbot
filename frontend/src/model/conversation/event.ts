import {createEvent} from "effector";
import {MessageType} from "./store";

export const addMessageEvent = createEvent<MessageType>();
export const updateMessageEvent = createEvent<MessageType>();
export const deleteMultiMessagesEvent = createEvent<string[]>();
export const deleteAllMessageEvent = createEvent();
export const deleteMessageEvent = createEvent<MessageType>();

export const selectPromptEvent = createEvent<string>();