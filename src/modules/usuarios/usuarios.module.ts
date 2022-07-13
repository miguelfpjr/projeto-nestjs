import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService]
})
export class UsuariosModule {}
