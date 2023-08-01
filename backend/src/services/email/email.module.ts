import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import "dotenv/config";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP_HOST || "",
                port: parseInt(process.env.SMTP_PORT || ""),
                secure: true,
                auth: {
                    user: process.env.SMTP_USER || "",
                    pass: process.env.SMTP_PASS || "",
                },
            },
            defaults: {
                from: `"No Reply" <${process.env.MAIL_FROM}>`,
            },
            template: {
                dir: join(__dirname, "templates"),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}
