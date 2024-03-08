import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RefrigeranteModule } from './modules/refrigerante/refrigerante.module';
import { ElectricidadModule } from './modules/electricidad/electricidad.module';
import { FugaSf6Module } from './modules/fuga-sf6/fuga-sf6.module';
import { ConsumoSeinModule } from './modules/consumo-sein/consumo-sein.module';
import { TransporteCasaTrabajoModule } from './modules/transporte-casa-trabajo/transporte-casa-trabajo.module';
import { TransporteAereoModule } from './modules/transporte-aereo/transporte-aereo.module';
import { TransporteTerrestreModule } from './modules/transporte-terrestre/transporte-terrestre.module';
import { PapelModule } from './modules/papel/papel.module';
import { AguaModule } from './modules/agua/agua.module';
import { TransporteInsumosModule } from './modules/transporte-insumos/transporte-insumos.module';
import { TransporteResiduosModule } from './modules/transporte-residuos/transporte-residuos.module';
import { TransportePropioModule } from './modules/transporte-propio/transporte-propio.module';
import { ReportesModule } from './modules/reportes/reportes.module';
import { ModuloModule } from './modules/modulo/modulo.module';

const defaultOptions = () => ({
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  extra: {
    trustServerCertificate: true,
  },
  // benchmark: true,
  logging: process.env.IS_DEV ? true : false,
  entities: ['dist/**/*.entity{.ts,.js}'],
});

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.dev', '.env.prod'] }),
    // TypeOrmModule.forRootAsync({
    //   name: 'PROD',
    //   useFactory: async () => ({
    //     database: process.env.DB_NAME,
    //     host: process.env.DB_HOST_PROD,
    //     type: 'mssql',
    //     autoLoadEntities: true,
    //     ...defaultOptions()
    //   })
    // }),
    TypeOrmModule.forRootAsync({
      name: 'DEV',
      useFactory: async () => ({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST_DEV,
        type: 'mssql',
        // autoLoadEntities: true,
        // synchronize: true,
        ...defaultOptions()
      })
    }),
    AuthModule,
    ReportesModule,
    RefrigeranteModule,
    ElectricidadModule,
    FugaSf6Module,
    ConsumoSeinModule,
    TransporteCasaTrabajoModule,
    TransporteAereoModule,
    TransporteTerrestreModule,
    PapelModule,
    AguaModule,
    TransporteInsumosModule,
    TransporteResiduosModule,
    TransportePropioModule,
    ModuloModule,
  ],
})
export class AppModule {}
