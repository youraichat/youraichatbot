import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "@modules/user/user.service";
import { UserEntity } from "@modules/user/user.entity";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { EmailService } from "@services/email/email.service";
import { generateCode, generateToken } from "@utils/service/token.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
    ) {}

    async validate(loginData: { email: string; password: string }) {
        const u: UserEntity = await this.userService.getUserByAttrService({
            email: loginData.email,
        });

        if (!u) {
            return null;
        }

        const isMatch = await bcrypt.compare(loginData.password, u.password);

        return isMatch ? u : null;
    }

    async validateExistUser(validateData: { email: string }) {
        const u: UserEntity = await this.userService.getUserByAttrService({
            email: validateData.email,
        });

        return Boolean(u?.id);
    }

    async registerService(registerData) {
        const token = await generateToken();
        const code = await generateCode(6);

        const user = await this.userService.createUserService({
            ...registerData,
            vToken: token,
            vCode: code,
        });

        this.emailService
            .verifyEmail(user.email, user.firstname + " " + user.lastname, user.vToken, user.vCode)
            .then((r) => {
                console.log(r);
            })
            .catch((e) => {
                console.warn(e);
            });
        return { success: true };
    }

    async loginService(user: UserEntity, ip: string) {
        const payload = {
            email: user.email,
            sub: user.id,
        };

        return {
            user: {
                ...user,
                password: undefined,
                vToken: undefined,
                vCode: undefined,
            },
            access_token: this.jwtService.sign(payload),
        };
    }

    async verifyEmailService(token: string) {
        let attr = {};

        if (token.length === 6) {
            attr = {
                vCode: token,
            };
        } else {
            attr = {
                vToken: token,
            };
        }

        const user = await this.userService.getUserByAttrService(attr);

        if (Boolean(user?.id)) {
            const newToken = await generateToken();
            const newCode = await generateCode(6);
            await this.userService.updateUserService(user.id, {
                emailVerified: true,
                vToken: newToken,
                vCode: newCode,
            });

            return this.loginService(user, "");
        }

        throw new BadRequestException("Your token is invalid");
    }

    async updateProfileService(user: any) {
        return this.userService.updateUserService(user.id, user);
    }

    async forgetService(email: string) {
        const user: UserEntity = await this.userService.getUserByAttrService({ email: email });

        if (!user.id) {
            throw new BadRequestException("This email is not in our user list");
        }

        const newToken = await generateToken();

        await this.userService.updateUserService(user.id, { vToken: newToken });

        this.emailService.forgetEmail(user.email, user.firstname + " " + user.lastname, newToken);

        return { success: true };
    }

    async resetPassService(data: { token: string; newPass: string }) {
        const user: UserEntity = await this.userService.getUserByAttrService({ vToken: data.token });

        if (!user?.id) {
            throw new BadRequestException("Your token is invalid or it was expired");
        }

        const token = await generateToken();
        const code = await generateCode(6);

        const saltOrRounds = await bcrypt.genSalt();
        const hash = await bcrypt.hash(data.newPass, saltOrRounds);

        await this.userService.updateUserService(user.id, { password: hash, vToken: token, vCode: code });

        return { success: true };
    }
}
