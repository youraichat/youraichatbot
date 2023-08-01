import { Module } from "@nestjs/common";
import { PromptController } from "./prompt.controller";
import { PromptService } from "./prompt.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PromptEntity } from "@modules/prompt/prompt.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PromptEntity])],
    controllers: [PromptController],
    providers: [PromptService],
    exports: [PromptService],
})
export class PromptModule {}
