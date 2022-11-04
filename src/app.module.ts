import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://murillosi:crumu147@cluster0.psh2vx5.mongodb.net/smartraking?retryWrites=true&w=majority',
    {
      useNewUrlParser: true, 
      useCreateIndex: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false
    }),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
