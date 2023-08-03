import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {USER_ROLE, UserEntity} from "@modules/user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { PromptEntity } from "@modules/prompt/prompt.entity";
import "dotenv/config";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(PromptEntity)
        private promptRepository: Repository<PromptEntity>,
    ) {}

    async createUserService(user) {
        let hash: string;

        if (user.password) {
            const saltOrRounds = await bcrypt.genSalt();
            const password = user.password;
            hash = await bcrypt.hash(password, saltOrRounds);
        }

        return await this.userRepository.save({
            ...user,
            password: hash,
        });
    }

    async getUserByAttrService(attr: any) {
        return this.userRepository.findOne({ where: { ...attr }, relations: ["prompts"] });
    }

    async updateUserService(id: string, user: any) {
        const u = await this.userRepository.findOne({ where: { id: id } });

        if (user.prompts) {
            console.log(user.prompts);
            const prompts = await this.promptRepository.find({ where: { id: In(user.prompts) } });

            console.log(prompts);
            u.prompts = prompts;
        }

        Object.keys(user).map((key) => {
            if (key !== "prompts") {
                u[key] = user[key];
            }
        });

        return this.userRepository.save(u);
    }

    async deleteUserService(id: string) {
        return this.userRepository.delete(id);
    }

    async usersService() {
        return this.userRepository.find({ relations: ["prompts"] });
    }


    async seedService() {

        const user: any = {
            email: process.env.DEFAULT_EMAIL || "test@test.com",
            password: process.env.DEFAULT_PASS || "1234",
            firstname: process.env.DEFAULT_FN || "1234",
            lastname: process.env.DEFAULT_FN || "1234",
            emailVerified: true,
            vToken: process.env.DEFAULT_EMAIL || "test@test.com",
            vCode: "123456",
            role: USER_ROLE.ADMIN
        }

        const saltOrRounds = await bcrypt.genSalt();
        const password = user.password;
        const hash = await bcrypt.hash(password, saltOrRounds);

        return await this.userRepository.save({
            ...user,
            password: hash,
        });
    }
}
