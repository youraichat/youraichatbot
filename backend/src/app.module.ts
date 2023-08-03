import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import "dotenv/config";
import { AuthModule } from "@services/auth/auth.module";
import { UserModule } from "@modules/user/user.module";
import { PromptModule } from "@modules/prompt/prompt.module";
import { EmailModule } from "@services/email/email.module";
import { ChatModule } from "@services/chat/chat.module";
import { SettingModule } from "@modules/setting/setting.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { MulterModule } from "@nestjs/platform-express";
import { FeedbackModule } from '@modules/feedback/feedback.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST || "",
            port: parseInt(process.env.DB_PORT) || 3306,
            username: process.env.DB_USER || "",
            password: process.env.DB_PASS || "",
            database: process.env.DB_NAME || "",
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: true,
            autoLoadEntities: true,
        }),
        AuthModule,
        UserModule,
        PromptModule,
        EmailModule,
        ChatModule,
        SettingModule,
        FeedbackModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
