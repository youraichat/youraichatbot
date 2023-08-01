import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { USER_ROLE } from "@modules/user/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: "email" });
    }

    async validate(email: string, password: string): Promise<any> {
        const user: any = await this.authService.validate({ email, password });

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!user.emailVerified) {
            throw new BadRequestException("You need to verify your email address");
        }

        if (!user.isActive) {
            throw new BadRequestException("You blocked by administrator. Please contact administrator");
        }

        return user;
    }
}
