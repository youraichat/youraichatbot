import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { jwtConstants } from "./constants";
import { UserService } from "@modules/user/user.service";
import { UserEntity } from "@modules/user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
            ignoreExpireation: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(validationPayload: { email: string; sub: string }): Promise<UserEntity | null> {
        return this.userService.getUserByAttrService({
            email: validationPayload.email,
        });
    }
}
