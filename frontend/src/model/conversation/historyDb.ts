import Dexie, {Table} from "dexie";
import {MessageType} from "@/model/conversation/store";

export class ConversationClassDexie extends Dexie {
    conversationHistory!: Table<MessageType>;
    constructor() {
        super("conversationHistory");
        this.version(1).stores({
            conversationHistory: "id, text, sender, prompt, avatar, like, typing, role, tokenCount, created, updated"
        })
    }
}

export const conversationDB = new ConversationClassDexie();