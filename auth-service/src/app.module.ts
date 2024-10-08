import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';

//наш главный модуль, сюда импортируем все наши модули
@Module({
  imports: [
    //это просто надо, зачемоно идёт по умолчанию
    ConfigModule.forRoot({ isGlobal: true }),
    //далее наши модули
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  //автоматичски создано
  controllers: [AppController],
  //автоматичски создано
  providers: [AppService],
})
//какая-то фигня. Снова связана с корсами. Тупо скопировал с какого-то проекта
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({
      contentSecurityPolicy: {
        directives: {
          connectSrc: [
            "'self'",
            'http://localhost:3000/*',
            '*.licdn.com',
            '*.linkedin.com/*',
            '*.lynda.com',
            'linkedin.sc.omtrdc.net/b/ss/',
            'cdn.linkedin.oribi.io',
            '*.data.digitalassistant.oci.oraclecloud.com/chat/',
            '*.tealiumiq.com',
            '*.microsoft.com',
            '*.office.com',
            '*.skype.com',
            '*.skype.net',
            '*.agora.io:*',
            '*.sd-rtn.com:*',
            '*.qualtrics.com',
            '*.trouter.io',
            'dpm.demdex.net/id',
            'lnkd.demdex.net',
            '*',
          ],
        },
      },
    });

    consumer.apply(HelmetMiddleware).forRoutes('*');
  }
}
