import {
    BadRequestException,
    Body,
    Controller,
    HttpStatus,
    ParseFilePipeBuilder,
    Post,
    Req,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RegisterType } from "@services/auth/types/register.type";
import { LoginType } from "@services/auth/types/login.type";
import { ForgetType } from "@services/auth/types/forget.type";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "@services/auth/guards/jwt.guard";
import { UpdateProfileType } from "@services/auth/types/update.type";
import { VerifyType } from "@services/auth/types/verify.type";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { ResetType } from "@services/auth/types/reset.type";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    async register(@Body() body: RegisterType) {
        const user = await this.authService.validateExistUser({ email: body.email });

        if (user) {
            throw new BadRequestException({ message: "The email address is already exist" });
        }

        return this.authService.registerService(body);
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Body() body: LoginType, @Req() req: any) {
        return this.authService.loginService(req.user, req.ip);
    }

    @Post("verify")
    async verify(@Body() body: VerifyType) {
        return this.authService.verifyEmailService(body.token);
    }

    @Post("update")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: join(__dirname, "../../..", "public/avatars"),
                filename: (req: any, file, cb) => {
                    return cb(null, `${req.user?.id}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    updateProfile(@UploadedFile() file: Express.Multer.File, @Body() body: UpdateProfileType, @Req() req: any) {
        return this.authService.updateProfileService({
            photo: file?.filename ? "/avatars/" + file?.filename : undefined,
            ...body,
            id: req.user.id,
        });
    }

    @Post("forget")
    async forget(@Body() body: ForgetType) {
        return this.authService.forgetService(body.email);
    }

    @Post("reset")
    async reset(@Body() body: ResetType) {
        return this.authService.resetPassService(body);
    }
}
