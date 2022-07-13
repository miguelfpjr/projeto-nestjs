import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategies';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PrismaService } from 'src/database/PrismaService';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsuariosModule, 
        PassportModule,
        JwtModule.register({
            privateKey: process.env.JWT_SECRET_KEY,
            signOptions: {expiresIn: '60s'},
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, UsuariosService, PrismaService, JwtStrategy]
    
})
export class AuthModule {}
