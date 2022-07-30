import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from 'src/schemas/user.schema';

@Injectable()
export class roleManagerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.user.role === Roles.ProjectManager) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
