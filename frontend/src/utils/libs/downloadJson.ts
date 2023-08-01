/*
* author: miroldev
* title: Download Conversation as Json
* overview: Utility function for Conversation Download.
* */

import {ConversationType, MessageType} from "@/model/conversation/store";


export const downloadConversationJson = (messages: MessageType[]) => {
    if (typeof window === 'undefined') return;

    const json = JSON.stringify(messages, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const filename = `conversation-${new Date().getTime()}.json`;

    const tempUrl = URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = tempUrl;
    tempLink.download = filename;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();

    document.body.removeChild(tempLink);
    URL.revokeObjectURL(tempUrl);
}