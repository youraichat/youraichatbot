/*
* author: miroldev
* title: Conversation to Markdown
* overview: Primitive rendering of a Conversation to Markdown
* */

import {ConversationType, MessageType} from "@/model/conversation/store";

export const conversationToMarkdown = (conversation: ConversationType, hideSystemMessage: boolean) => {
    return conversation.messages.filter(message => !hideSystemMessage || message.role !== "system")
        .map((message: MessageType) => {
            let sender: string = message.sender;
            let text: string = message.text;

            switch (message.role) {
                case 'system':
                    sender = "✨ System message";
                    text = '*' + text + '*';
                    break;
                case  'assistant':
                    sender = `🤖 assistance message`.trim();
                    break;
                case 'user':
                    sender = '💬 You';
                    break;
            }

            return `### ${sender}\n\n${text}\n\n`;
        }).join('---\n\n');
}