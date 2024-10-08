import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//1 в 1 как и auth-service
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
