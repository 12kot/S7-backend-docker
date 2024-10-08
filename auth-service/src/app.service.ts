import { Injectable } from '@nestjs/common';

//нигде не используем, оно автоматически создалось
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
