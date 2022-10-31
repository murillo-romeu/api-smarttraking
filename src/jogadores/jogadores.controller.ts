import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
    
    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDTO: CriarJogadorDTO){
        
            const {email} = criarJogadorDTO
      
            return JSON.stringify({
        "email": email
      })
    }
}
