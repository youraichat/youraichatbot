import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { PromptService } from "@modules/prompt/prompt.service";
import { CreatePromptType } from "@modules/prompt/types/create.type";
import { JwtAuthGuard } from "@services/auth/guards/jwt.guard";
import { Roles } from "@services/auth/strategies/roles.decorator";
import { USER_ROLE } from "@modules/user/user.entity";
import { RolesGuard } from "@services/auth/guards/roles.guard";
import { UpdatePromptType } from "@modules/prompt/types/update.type";
import { DeletePromptType } from "@modules/prompt/types/delete.type";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { v4 as uuid } from "uuid";

@Controller("prompt")
export class PromptController {
    constructor(private readonly promptService: PromptService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.USER, USER_ROLE.SUPPORT])
    @Get()
    async prompts(@Req() req: any) {
        return this.promptService.getPromptsService(req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([USER_ROLE.ADMIN, USER_ROLE.MANAGER])
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: join(__dirname, "../../..", "public/prompts"),
                filename: (req: any, file, cb) => {
                    return cb(null, `${uuid()}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    @Post()
    async createPrompt(@Body() body: CreatePromptType, @UploadedFile() file: Express.Multer.File) {
        return this.promptService.createPromptService({
            ...body,
            photo: file?.filename ? "/prompts/" + file?.filename : undefined,
        });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([USER_ROLE.ADMIN, USER_ROLE.MANAGER])
    @Post("/update")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: join(__dirname, "../../..", "public/prompts"),
                filename: (req: any, file, cb) => {
                    return cb(null, `${uuid()}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    async updatePrompt(@Body() body: UpdatePromptType, @UploadedFile() file: Express.Multer.File) {
        return this.promptService.updatePromptService(body.id, {
            ...body,
            photo: file?.filename ? "/prompts/" + file?.filename : undefined,
        });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([USER_ROLE.ADMIN, USER_ROLE.MANAGER])
    @Delete(":id")
    async deletePrompt(@Param() param: DeletePromptType) {
        return this.promptService.deletePromptService(param.id);
    }
}
