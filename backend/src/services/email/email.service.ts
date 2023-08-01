import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { SentMessageInfo } from "nodemailer";

type SendMailType = {
    to: string;
    subject: string;
    template: string;
    context: any;
};

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail({ to, subject, template, context }: SendMailType): Promise<SentMessageInfo> {
        return this.mailerService.sendMail({
            to: to,
            subject,
            template,
            context,
        });
    }

    async verifyEmail(email: string, name: string, token: string, code: string) {
        const link = `${process.env.FRONT_URL || "http://localhost:4000"}/admin?mode=verify&token=${token}`;

        const payload: SendMailType = {
            to: email,
            subject: "Verify Your AI Chat email",
            template: "verify",
            context: {
                name: name,
                code: code,
                link: link,
            },
        };
        return this.sendMail(payload);
    }

    async inviteEmail(email: string, name: string, token: string) {
        const link = `${process.env.FRONT_URL || "http://localhost:4000"}/admin?mode=verify&token=${token}`;

        const payload: SendMailType = {
            to: email,
            subject: "You've invited to Your AI Chat",
            template: "invite",
            context: {
                name: name,
                link: link,
            },
        };

        return this.sendMail(payload);
    }

    async forgetEmail(email: string, name: string, token: string) {
        const link = `${process.env.FRONT_URL || "http://localhost:4000"}/admin?mode=reset&token=${token}`;

        const payload: SendMailType = {
            to: email,
            subject: "Forget your password!",
            template: "forget",
            context: {
                name: name,
                link: link,
            },
        };
        return this.sendMail(payload);
    }
}
