import { Injectable } from '@nestjs/common';
import { CreateUsuarioDTO } from '../usuarios/dto/create-usuarios.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usuariosService: UsuariosService, private readonly jwtService: JwtService){}

    async login(user){
        const payload ={
            sub: user.id,
            email: user.email
        }

        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(login: string, senha: string){
        let user: CreateUsuarioDTO
        try{
            user = await this.usuariosService.findOne(login);
        } catch (error) {
            return null
        }

        const isPasswordValid = compareSync(senha, user.senha);

        if(!isPasswordValid) {
            return null
        } return user;
    }
}
