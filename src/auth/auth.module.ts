import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[TypeOrmModule.forFeature([Admin]),
  PassportModule,
  JwtModule.register({
    secret:'jwt_secret',
    signOptions:{expiresIn:'1d'}
  })
    ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
