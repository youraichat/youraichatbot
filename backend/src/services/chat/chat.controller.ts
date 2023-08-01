import { Body, Controller, Param, Post } from "@nestjs/common";
import { ChatService } from "@services/chat/chat.service";
import { ChatType } from "./types/chat";

@Controller("chat")
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post(":id")
    async chat(@Body() body: ChatType, @Param("id") id: string) {
        return this.chatService.chatService(body, id);
    }
}
