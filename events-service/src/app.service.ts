import { Injectable } from '@nestjs/common';

//1 в 1 как и auth-service
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
