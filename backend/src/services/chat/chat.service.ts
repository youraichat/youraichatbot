import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { PromptService } from "@modules/prompt/prompt.service";
import { SettingService } from "@modules/setting/setting.service";

@Injectable()
export class ChatService {
    constructor(
        private readonly httpService: HttpService,
        private readonly promptService: PromptService,
        private readonly settingService: SettingService,
    ) {}

    async chatService(params: { question: string }, id: string) {
        const { key } = await this.promptService.getPromptService(id);
        const settings = await this.settingService.getSettingsService();

        try {
            const { data } = await this.httpService
                .post(
                    `http://localhost:${process.env.CHAT}/api/v1/prediction/${key}`,
                    {
                        question: params.question,
                    },
                    { headers: { Authorization: "Bearer " + settings.key } },
                )
                .toPromise();

            return { message: data };
        } catch (e) {
            console.warn(e?.response?.data, "ERROR");
            throw new HttpException({ message: e?.response?.data }, 400);
        }
    }
}
