import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { DesafioStatus } from './interfaces/desafio-status.enum';
import { Desafio } from './interfaces/desafio.interface';

@Injectable()
export class DesafiosService {
    constructor(
        @InjectModel('Desafio') 
        private readonly desafioModel: Model<Desafio>,
        private readonly jogadoresService: JogadoresService,
        private readonly categoriaService: CategoriasService
    ) { }

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio>{
        const { solicitante } = criarDesafioDto;
        const buscaSolicitante = await this.jogadoresService.consultaJogadorPeloId(solicitante)

        //solicitante está no desafio?
        //verificar se o solicitante está em uma categoria
        const categoriaJogador = await this.categoriaService.consultarCategoriaJogadorId(buscaSolicitante.id);

        const desafioCriado = new this.desafioModel(criarDesafioDto);

        desafioCriado.dataHoraSolicitacao = new Date();
        desafioCriado.status = DesafioStatus.PENDENTE;
        desafioCriado.categoria = categoriaJogador

        return await desafioCriado.save()
    }

    async listarDesafios(): Promise<Desafio[]> {
        return await this.desafioModel.find().exec()
    }

}
