import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { HttpModule } from "@nestjs/axios";
import { SettingModule } from "@modules/setting/setting.module";
import { PromptModule } from "@modules/prompt/prompt.module";

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        SettingModule,
        PromptModule,
    ],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService],
})
export class ChatModule {}
