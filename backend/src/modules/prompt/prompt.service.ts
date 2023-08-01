import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { PromptEntity } from "@modules/prompt/prompt.entity";
import { USER_ROLE } from "@modules/user/user.entity";

@Injectable()
export class PromptService {
    constructor(
        @InjectRepository(PromptEntity)
        private promptRepository: Repository<PromptEntity>,
    ) {}

    async getPromptsService(user: any) {
        console.log(user);
        let where = {};
        if (user.role === USER_ROLE.USER || user.role === USER_ROLE.SUPPORT) {
            where = { id: In(user.prompts.map((u) => u.id)) };
        }
        return this.promptRepository.find({ where: where });
    }

    async getPromptService(id: string) {
        return this.promptRepository.findOne({ where: { id: id } });
    }

    async createPromptService(prompt) {
        return this.promptRepository.save(prompt);
    }

    async updatePromptService(id, p) {
        const prompt = await this.promptRepository.findOne({ where: { id: id } });

        if (!prompt?.id) {
            throw new BadRequestException("Invalid id");
        }

        Object.keys(p).map((key) => {
            prompt[key] = p[key];
        });

        return this.promptRepository.update(id, { ...p });
    }

    async deletePromptService(id: string) {
        return this.promptRepository.delete(id);
    }
}
