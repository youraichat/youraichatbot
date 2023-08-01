import { Module } from "@nestjs/common";
import { SettingService } from "./setting.service";
import { SettingController } from "./setting.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SettingsEntity } from "./setting.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SettingsEntity])],
    providers: [SettingService],
    controllers: [SettingController],
    exports: [SettingService],
})
export class SettingModule {}
