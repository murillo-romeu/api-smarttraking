import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from "class-validator";

export class CriarDesafioDto {
    @IsNotEmpty()
    @IsDateString()
    dataHoraDesafio: Date;

    @IsNotEmpty()
    solicitante: string;

    @IsArray()
    @ArrayMaxSize(2)
    @ArrayMinSize(2)
    jogadores: string[]
}