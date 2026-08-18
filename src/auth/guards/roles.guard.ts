import { CanActivate, ExecutionContext, ForbiddenException, Injectable, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import { UserRole } from '../../users/enums/user-role.enum.js';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector,) { }

    canActivate(context: ExecutionContext,): boolean { /*se ejecuta cada vez que alguien intenta acceder
                                                         a un endpoint protegido*/
        const requiredRoles: UserRole[] = this.reflector.getAllAndOverride(ROLES_KEY, /*lee la metadata y busca 'roles'*/
                [
                    context.getHandler(), /*devuelve el metodo actual*/
                    context.getClass(), /*devuelve el controlador actual*/
                ],
            );

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const user = request.user; /*obtiene el usuario de la request*/

        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException(
                'No tienes permisos para acceder a este recurso',
            );
        }
        return true;
    }
}