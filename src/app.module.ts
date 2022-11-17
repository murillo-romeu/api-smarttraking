import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://murillosi:crumu147@cluster0.psh2vx5.mongodb.net/smartraking?retryWrites=true&w=majority',
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }),
    JogadoresModule,
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
