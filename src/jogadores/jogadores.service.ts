import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

    async consultaJogadorPeloEmail(email: string): Promise<Jogador>{
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        return await jogadorEncontrado;
    }

    async deletarJogador(email): Promise<void> {
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);

        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
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
