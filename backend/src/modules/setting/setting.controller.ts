import { Body, Controller, Get, Post } from "@nestjs/common";
import { SettingService } from "./setting.service";

@Controller("setting")
export class SettingController {
    constructor(private readonly settingService: SettingService) {}

    @Post()
    async initSettings() {
        return this.settingService.initService();
    }

    @Get()
    async getSettings() {
        return this.settingService.getSettingsService();
    }

    @Post("/update")
    async updateSettings(@Body() body: any) {
        return this.settingService.updateService(body);
    }
}
