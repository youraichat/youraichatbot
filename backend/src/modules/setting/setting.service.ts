import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SettingsEntity } from "./setting.entity";

@Injectable()
export class SettingService {
    constructor(
        @InjectRepository(SettingsEntity)
        private settingsRepository: Repository<SettingsEntity>,
    ) {}
    async initService() {
        const initPayload: any = {
            key: "abc",
            accessor: "abc",
            createAccount: true,
        };

        return this.settingsRepository.save(initPayload);
    }

    async updateService(payload) {
        const settings = await this.settingsRepository.findOne({ where: { id: "1" } });

        if (settings?.id) {
            settings.key = payload.key;
            settings.createAccount = payload.createAccount;

            return this.settingsRepository.save(settings);
        } else {
            return this.settingsRepository.save({
                id: "1",
                key: payload.key,
                createdAccount: payload.createdAccount,
            });
        }
    }

    async getSettingsService() {
        return this.settingsRepository.findOne({ where: { id: "1" } });
    }
}
