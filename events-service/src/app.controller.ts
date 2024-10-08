import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//1 в 1 как и auth-service
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
