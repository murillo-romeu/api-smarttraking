import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogdor(criarJogadorDTO: CriarJogadorDTO): Promise<void> {
        const { email } = criarJogadorDTO;

        const jogadorEncontrado = await this.jogadorModel.findOne({
            email
        }).exec();

        if (jogadorEncontrado) {
            await this.atualizar(criarJogadorDTO);
        } else {
            await this.criar(criarJogadorDTO);
        }
       
    }

    async consultaTodosJogadores(): Promise<Jogador[]>{
        return await this.jogadorModel.find().exec();
    }

    async consultaJogadorPeloEmail(email: string): Promise<Jogador>{
        const jogadorEncontrado = await this.jogadorModel.findOne({
            email
        }).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        return await jogadorEncontrado;
    }

    async deletarJogador(email): Promise<any> {
        return await this.jogadorModel.remove({
            email
        }).exec();
    }

    private async criar(criaJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(criaJogadorDTO);

        return await jogadorCriado.save();

    }

    private async atualizar(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({
            email: criarJogadorDTO.email
        }, {
            $set: criarJogadorDTO
        }).exec();
    }


}
