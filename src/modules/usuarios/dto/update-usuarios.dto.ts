import { IsNotEmpty, Matches } from "class-validator";
import { RegExHelper } from "src/helpers/regex.helper";

export class UpdateUsuarioDTO {
    
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password)
    senha: string;
}