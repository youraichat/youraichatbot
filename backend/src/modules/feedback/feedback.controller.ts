import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { FeedbackService } from "@modules/feedback/feedback.service";
import { JwtAuthGuard } from "@services/auth/guards/jwt.guard";
import { RolesGuard } from "@services/auth/guards/roles.guard";
import { Roles } from "@services/auth/strategies/roles.decorator";
import { USER_ROLE } from "@modules/user/user.entity";

@Controller("feedback")
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Post("/create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.SUPPORT, USER_ROLE.USER])
    async writeFeedback(@Body() body: any, @Req() req: any) {
        return this.feedbackService.createService({ ...body, author: req.user });
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([USER_ROLE.ADMIN, USER_ROLE.MANAGER])
    async getFeedbacks() {
        return this.feedbackService.getService();
    }
}
