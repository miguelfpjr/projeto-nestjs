import { HttpCode, Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { hashPassword } from 'src/util/bcrypt';
import { CreateUsuarioDTO } from './dto/create-usuarios.dto';
import { UpdateUsuarioDTO } from './dto/update-usuarios.dto';

@Injectable()
export class UsuariosService {
    constructor(private prisma: PrismaService){}

    async create(data: CreateUsuarioDTO){
        const userExists = await this.prisma.user.findFirst({
            where: {
                login: data.login
            }
        }, )

        if(userExists){
            throw new Error('Usuario já cadastrado')
        }

        const user = await this.prisma.user.create({
            data:{
                email: data.email,
                login: data.login,
                nome: data.nome,
                senha: hashPassword(data.senha)
            }
        })

        return user
    }

    async findOne(login: string) {
        const userFind = await this.prisma.user.findUnique({
            where: {
                login
            }
        })

        if(!userFind){
            throw new Error("Usuario não encontrado")
        }

        return userFind;
    }

    async update(login: string, data: UpdateUsuarioDTO){
        const userFind = await this.prisma.user.findUnique({
            where: {
                login
            }
        });

        if(!userFind){
            throw new Error("Usuario não encontrado")
        }
        return await this.prisma.user.update({
            data,
            where: {
                login,
            }
        })
    }

    async delete(login: string){
        const userFind = await this.prisma.user.findUnique({
            where: {
                login
            }
        });

        if(!userFind){
            throw new Error("Usuario não encontrado")
        }

        return await this.prisma.user.delete({
            where: {
                login,
            }
        })
    }
}
