import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDTO } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    async criarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
        const { email } = criarJogadorDTO;

        const jogadorEncontrado = await this.jogadorModel.findOne({
            email
        }).exec();

        if (jogadorEncontrado) {
            throw new BadRequestException(`E-mail: ${email} já cadastrado.`)
        }

        const jogadorCriado = new this.jogadorModel(criarJogadorDTO);

        return await jogadorCriado.save();

    }

    async atualizarJogador(_id: string, atualizarJogadorDTO: AtualizarJogadorDTO): Promise<void> {
        const jogadorEncontrado = await this.jogadorModel.findOne({
            _id
        }).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com o id: ${_id} não encontrado.`);
        }

        await this.jogadorModel.findOneAndUpdate({
            _id
        }, {
            $set: atualizarJogadorDTO
        }).exec();

    }

    async consultaTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultaJogadorPeloId(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findById(_id).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }
        return await jogadorEncontrado;
    }

    async deletarJogador(_id): Promise<any> {
        const jogadorEncontrado = await this.jogadorModel.findById(_id).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }
        
        return await this.jogadorModel.findByIdAndDelete(_id).exec();
    }

}
