import {MessageType} from "./store";
import {conversationDB} from "@/model/conversation/historyDb";

export class HistoryHelper {
    public async addConversationHistory(msg: MessageType): Promise<void> {
        try {
            if(msg?.id) {
                conversationDB.conversationHistory.add({...msg})
            }
        } catch (e) {
            console.warn(e)
        }
    }

    public async updateConversationHistory(msg: MessageType): Promise<void> {
        try {
            if(msg?.id) {
                conversationDB.conversationHistory.update(msg.id, {...msg})
            }
        } catch (e) {
            console.warn(e)
        }
    }

    public async getConversationsHistory(): Promise<MessageType[]> {
        try {
            return conversationDB.conversationHistory.orderBy("created").reverse().toArray()
        } catch (e) {
            console.warn(e)
            return []
        }
    }

    public async deleteConversationHistory(msg: MessageType): Promise<void> {
        try {
            return conversationDB.conversationHistory.delete(msg.id)
        } catch (e) {
            console.warn(e)
        }
    }

    public async deleteMultiConversationHistory(keys: string[]): Promise<void> {
        try {
            return conversationDB.conversationHistory.bulkDelete(keys)
        } catch (e) {
            console.warn(e)
        }
    }

    public async deleteAllConversationHistory(): Promise<void> {
        try {
            return conversationDB.conversationHistory.clear();
        } catch (e) {
            console.warn(e)
        }
    }
}