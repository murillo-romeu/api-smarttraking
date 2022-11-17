import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDTO } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { };

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criarJogadorDTO)
    };

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDTO: AtualizarJogadorDTO,
        @Param('_id', ValidacaoParametrosPipe) _id: string
    ): Promise<void> {
        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDTO)
    };

    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadoresService.consultaTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadorPeloId(@Param('_id', ValidacaoParametrosPipe) _id: string): Promise<Jogador> {
        return await this.jogadoresService.consultaJogadorPeloId(_id);
    }

    @Delete('/:_id')
    async deletarJogador(@Param('_id', ValidacaoParametrosPipe) _id: string): Promise<void> {
        this.jogadoresService.deletarJogador(_id);
    }
}
