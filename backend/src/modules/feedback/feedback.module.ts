import { Module } from "@nestjs/common";
import { FeedbackController } from "./feedback.controller";
import { FeedbackService } from "./feedback.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeedbackEntity } from "@modules/feedback/feedback.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackEntity])],
    controllers: [FeedbackController],
    providers: [FeedbackService],
})
export class FeedbackModule {}
