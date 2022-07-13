import { hashSync } from 'bcrypt';

export function hashPassword(senha: string){
    return senha = hashSync(senha, 10);
}
