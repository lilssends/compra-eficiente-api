import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
              throw new UnauthorizedException('Token not provided');
      }

      const token = authHeader.substring(7);

      try {
              const user = await this.authService.verifyToken(token);
              request.user = user;
              return true;
      } catch {
              throw new UnauthorizedException('Invalid or expired token');
      }
  }
}
