import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RefrigeranteModule } from './refrigerante/refrigerante.module';
import { ElectricidaModule } from './electricida/electricida.module';
import { Combustiblea1Module } from './combustiblea1/combustiblea1.module';

@Module({
  imports: [

    ConfigModule.forRoot(),

    TypeOrmModule.forRoot(
      {
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'sa',
        password: 'Animelo12.',
        database: 'Huellacarbono',
        options: {
          encrypt: false,
        },
        synchronize: true,
        autoLoadEntities: true,
      }
    ),

    AuthModule,

    //RefrigeranteModule,

    ElectricidaModule,

    Combustiblea1Module,
  ],
})
export class AppModule {}
