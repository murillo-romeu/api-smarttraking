import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria')
        private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService
    ) { }

    async criarCategoria(criarCategoriaDTO: CriarCategoriaDTO): Promise<Categoria> {
        const { categoria } = criarCategoriaDTO;

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (categoriaEncontrada) {
            throw new BadRequestException(`A categoria ${categoria} já existe.`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDTO);

        return await categoriaCriada.save();
    }

    async consultarTodasCategorias(): Promise<Categoria[]> {
        return await this.categoriaModel.find().populate('jogadores').exec();
    }

    async conultarCategoriaId(_id): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findById(_id).populate('jogadores').exec();
        if (!categoriaEncontrada) {
            throw new NotFoundException(`A categoria do ID ${_id} não foi encontrada.`)
        }

        return categoriaEncontrada
    }

    async conultarCategoria(categoria): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).populate('jogadores').exec();
        if (!categoriaEncontrada) {
            throw new NotFoundException(`A categoria do ID ${categoria} não foi encontrada.`)
        }

        return categoriaEncontrada
    }

    async atualizarCategoria(_id: string, atualizarCategoriaDTO: AtualizarCategoriaDTO): Promise<void> {
        const categoriaEncontrada = await this.categoriaModel.findById(_id);
        if (!categoriaEncontrada) {
            throw new NotFoundException(`A categoria do ID ${_id} não foi encontrada.`)
        }

        await this.categoriaModel.findOneAndUpdate(
            {
                _id
            },
            {
                $set: atualizarCategoriaDTO
            }
        ).exec();
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void> {
        const idCategoria = params['idCategoria'];
        const idJogador = params['idJogador'];

        const categoriaEncontrada = await this.categoriaModel.findById(idCategoria).exec();

        if (!categoriaEncontrada) {
            throw new NotFoundException(`A categoria ${idCategoria} não foi encontrada.`)
        }

        await this.jogadoresService.consultaJogadorPeloId(idJogador);

        const jogadorJaCadastradoCategoria = await this.categoriaModel.find({ _id: idCategoria })
            .where('jogadores').in(idJogador).exec();

        if (jogadorJaCadastradoCategoria.length > 0) {
            throw new BadRequestException(`O jogador ${idJogador} já cadastrado na categoria ${idCategoria}.`);
        }

        categoriaEncontrada.jogadores.push(idJogador);

        await this.categoriaModel.findByIdAndUpdate(idCategoria, { $set: categoriaEncontrada }).exec()
    }
}
