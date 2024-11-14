import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
	canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest();
		const currentUserRole = req.user?.role;

		if (!currentUserRole) throw new ForbiddenException('User role not found');

		if (currentUserRole === 'User') {
            throw new ForbiddenException(
				'You do not have permission to access this resource'
			);
        }

		return true;
	}
}
