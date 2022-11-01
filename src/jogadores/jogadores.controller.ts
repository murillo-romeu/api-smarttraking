import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
    
    constructor(private readonly jogadoresService: JogadoresService){};

    @Post()
    async criarAtualizarJogador(@Body() criarJogadorDTO: CriarJogadorDTO){
        await this.jogadoresService.criarAtualizarJogdor(criarJogadorDTO)
    };

    @Get()
    async consultarJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> { 
        if (email) {
            return await this.jogadoresService.consultaJogadorPeloEmail(email);
        } else {
            return await this.jogadoresService.consultaTodosJogadores();
        }
    }

    @Delete()
    async deletarJogador(@Query('email') email: string): Promise<void> {
        this.jogadoresService.deletarJogador(email);
    }
}
