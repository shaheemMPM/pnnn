import { ConfigService } from './services/config.service';
import { PrismaService } from './services/prisma.service';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

const providers = [PrismaService, ConfigService];

@Global()
@Module({
  providers,
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME') || '3d',
        },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  exports: [...providers, JwtModule],
})
export class SharedModule {}
