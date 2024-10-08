import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//нигде не используем, оно автоматически создалось
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
