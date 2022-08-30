import { routes } from './lib/routes';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { ViewModule } from './view/view.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { contextMiddleware } from './middlewares/context.middleware';

@Module({
  imports: [
    RouterModule.register(routes),
    SharedModule,
    AuthModule,
    ViewModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}
