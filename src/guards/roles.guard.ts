import {Reflector} from "@nestjs/core";
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import {Roles} from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){} // IoC控制反转

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    if(!roles) return true; // 未注释有效Roles，即无角色条件
    const request = context.switchToHttp().getRequest();
    const user = request.user;  // 取出用户
    throw new UnauthorizedException()
    // return true;
  }
}