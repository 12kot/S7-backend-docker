import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { EventModule } from './api/events/event.module';
import { AuthModule } from './api/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      max: 100,
      ttl: 60,
      isGlobal: true,
      store: redisStore,
      host: 'redis',
      port: 6379,
    }),
    DatabaseModule,
    EventModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
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
