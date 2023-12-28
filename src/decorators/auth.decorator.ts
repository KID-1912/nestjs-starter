
import { SetMetadata, UseGuards, applyDecorators, UseFilters } from "@nestjs/common"
import { AuthGuard } from "src/guards/auth.guard"
import { HttpExceptionFilter } from "src/filters/exception.filter"
import { ApiBearerAuth } from "@nestjs/swagger"

export const Auth = function (...Roles: string[]){
  applyDecorators(
    SetMetadata('roles', Roles),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    UseFilters(HttpExceptionFilter),
  )
} 