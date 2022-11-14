import { IsEmail, IsNotEmpty } from "class-validator";

export class CriarJogadorDTO {
    @IsNotEmpty()
    readonly telefoneCelular: string;
    
    @IsEmail()
    readonly email: string;
    
    readonly nome: string;
}