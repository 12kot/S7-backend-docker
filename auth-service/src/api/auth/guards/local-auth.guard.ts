import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//встроенная
export class LocalAuthGuard extends AuthGuard('local') {}
