import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FeedbackEntity } from "./feedback.entity";

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(FeedbackEntity)
        private feedbackRepository: Repository<FeedbackEntity>,
    ) {}

    async createService(data) {
        return this.feedbackRepository.save({ ...data });
    }
    async getService() {
        return this.feedbackRepository.find({
            where: {},
            relations: ["author", "prompt"],
            order: { createdAt: "DESC" },
        });
    }
}
