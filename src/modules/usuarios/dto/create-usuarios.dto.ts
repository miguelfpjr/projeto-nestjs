import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { MessageHelper } from "src/helpers/message.helper";
import { RegExHelper } from "src/helpers/regex.helper";

export class CreateUsuarioDTO {
    
    @IsNotEmpty({
        message: MessageHelper.NOME_EMPTY
    })
    nome: string;

    @IsNotEmpty({
        message: MessageHelper.LOGIN_EMPTY
    })
    login: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password, {
        message: MessageHelper.SENHA_VALID
    })
    senha: string;

    @IsNotEmpty({
        message: MessageHelper.EMAIL_EMPTY
    })
    @IsEmail()
    email: string;

}