import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { EmailModule } from "@services/email/email.module";
import { PromptEntity } from "@modules/prompt/prompt.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, PromptEntity]), EmailModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
