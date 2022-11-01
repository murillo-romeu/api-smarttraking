import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class JogadoresService {
    private jogadores: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogdor(criarJogadorDTO: CriarJogadorDTO): Promise<void> {
        const { email } = criarJogadorDTO;

        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

        if (jogadorEncontrado) {
            return this.atualizar(jogadorEncontrado, criarJogadorDTO)
        } else {
            this.criar(criarJogadorDTO);
        }
       
    }

    async consultaTodosJogadores(): Promise<Jogador[]>{
        return await this.jogadores;
    }

    private criar(criaJogadorDTO: CriarJogadorDTO): void {

        const {nome, email, telefoneCelular} = criaJogadorDTO;

        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            posicaoRanking: 0,
            ranking: 'A',
            urlFotoJogador: 'foto.bmp'
        };

        this.jogadores.push(jogador);

        this.logger.log(`criaJogadorDTO: ${JSON.stringify(this.jogadores)}`);

    }

    private atualizar(jogadorEncontrado: Jogador, criarJogadorDTO: CriarJogadorDTO): void {
        const { nome } = criarJogadorDTO;

        jogadorEncontrado.nome = nome;

    }


}
