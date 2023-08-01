import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "@modules/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { EmailModule } from "@services/email/email.module";
import { jwtConstants } from "@services/auth/strategies/constants";

@Module({
    imports: [
        UserModule,
        PassportModule,
        EmailModule,
        JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: "7 days" } }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
