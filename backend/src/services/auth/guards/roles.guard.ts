import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { USER_ROLE } from "@modules/user/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>("roles", context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return RolesGuard.matchRoles(roles, user.role);
    }

    private static matchRoles(roles: string[], widthRole: string) {
        return widthRole === USER_ROLE.ADMIN || roles.includes(widthRole);
    }
}
