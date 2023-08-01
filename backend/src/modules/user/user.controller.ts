import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { USER_ROLE, UserEntity } from "@modules/user/user.entity";
import { UserService } from "@modules/user/user.service";
import { JwtAuthGuard } from "@services/auth/guards/jwt.guard";
import { RegisterType } from "@services/auth/types/register.type";
import { Roles } from "@services/auth/strategies/roles.decorator";
import { EmailService } from "@services/email/email.service";
import { generateCode, generateToken } from "@utils/service/token.service";
import { RolesGuard } from "@services/auth/guards/roles.guard";
import { DeletePromptType } from "@modules/prompt/types/delete.type";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService, private readonly emailService: EmailService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([USER_ROLE.ADMIN])
    @Get()
    async getUsers(): Promise<UserEntity[]> {
        return this.userService.usersService();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([USER_ROLE.ADMIN])
    @Post()
    async createUser(@Body() body: RegisterType): Promise<UserEntity> {
        const token = await generateToken();
        const code = await generateCode(6);
        const user: UserEntity = await this.userService.createUserService({ ...body, vToken: token, vCode: code });

        if (user.email) {
            await this.emailService.inviteEmail(user.email, user.firstname + " " + user.lastname, user.vToken);
        }

        return user;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([USER_ROLE.ADMIN])
    @Post("update")
    async updateUser(@Body() body: any): Promise<UserEntity> {
        return this.userService.updateUserService(body.id, { ...body });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([USER_ROLE.ADMIN, USER_ROLE.MANAGER])
    @Delete(":id")
    async deleteUser(@Param() param: any) {
        return this.userService.deleteUserService(param.id);
    }
}
