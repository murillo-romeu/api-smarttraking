import { Document } from "mongoose";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { DesafioStatus } from "./desafio-status.enum";

export interface Desafio extends Document {
    dataHoraDesafio: Date;
    status: DesafioStatus;
    dataHoraSolicitacao: Date;
    dataHoraResposta: Date;
    solicitante: Jogador;
    categoria: string;
    jogadores: Jogador[];

}

export interface Partida extends Document {
    categoria: string;
    jogadores: Jogador[];
    def: Jogador;
    resultado: Resultado[];
}

export interface Resultado {
    set: string;
}