import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
    
    constructor(private readonly categoriasService: CategoriasService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDTO: CriarCategoriaDTO): Promise<Categoria>{
        return await this.categoriasService.criarCategoria(criarCategoriaDTO);
    }

    @Get()
    async consultarCategorias(): Promise<Categoria[]>{
        return await this.categoriasService.consultarTodasCategorias()
    }

    @Get('/:_id')
    async consutarCategoriaId(@Param('_id') _id: string): Promise<Categoria>{
        return await this.categoriasService.conultarCategoriaId(_id)
    }

    @Get('/sigla/:categoria')
    async consutarCategoria(@Param('categoria') categoria: string): Promise<Categoria>{
        return await this.categoriasService.conultarCategoria(categoria)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Body() atualizarCategoriaDTO: AtualizarCategoriaDTO,
        @Param('_id') _id: string
    ): Promise<void>{
        await this.categoriasService.atualizarCategoria(_id, atualizarCategoriaDTO)
    }


    @Post('/:idCategoria/jogadores/:idJogador')
    async atribuirCategoriaJogador(
        @Param() params: string[]
    ): Promise<void>{
        
        return await this.categoriasService.atribuirCategoriaJogador(params);
        
    }


}
