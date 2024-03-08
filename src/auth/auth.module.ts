import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';
import { Accesos } from './entities/accesos.entity';
import { Modulo } from '../modules/modulo/entities/modulo.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, Accesos, Modulo], 'DEV'),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SEED,
        signOptions: {
          expiresIn: process.env.TK_EXP,
          audience: process.env.DOCS_SERVER,
        },
      }),
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    { provide: APP_GUARD, useClass: JwtGuard, }
  ],
  exports: [],
})
export class AuthModule {}
