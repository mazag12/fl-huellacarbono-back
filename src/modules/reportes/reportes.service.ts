import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { GetReporteByTypeAndDateDto } from '../../common/dto/get-reporte-by-type-and-date.dto';
import { ColumnasParaIngresos, TablasParaTiposPorIngreso } from 'src/common/constants';
import { ConsumoSeinIngreso } from '../consumo-sein/entities/consumo-sein-ingreso.entity';
import { ConsumoSeinTipo } from '../consumo-sein/entities/consumo-sein-tipo.entity';
import { ElectricidadIngreso } from '../electricidad/entities/electricidad-ingreso.entity';
import { ElectricidadTipo } from '../electricidad/entities/electricidad-tipo.entity';

@Injectable()
export class ReportesService {

    constructor(
        @InjectDataSource('DEV')
        private readonly DEV: DataSource,

        @InjectRepository(ConsumoSeinIngreso, 'DEV')
        private readonly consumoSeinIngresoRepo: Repository<ConsumoSeinIngreso>,

        @InjectRepository(ElectricidadIngreso, 'DEV')
        private readonly electricidadIngresoRepo: Repository<ElectricidadIngreso>,
    ) {}

    // getReporteByTypeAndDate({ tipoDate, tipoReporte, valueDate }: GetReporteByTypeAndDateDto) {
    //     return this.DEV.query(`SELECT ${ColumnasParaIngresos[tipoReporte]} FROM ${tipoReporte}
    //             ${TablasParaTiposPorIngreso[tipoReporte]}
    //             WHERE ${tipoDate}(fecha_ingreso) = '${valueDate}'`);
    // }
    // async getReporteByTypeAndDate({ tipoDate, tipoReporte, valueDate }: GetReporteByTypeAndDateDto) {
    //     return await this.electricidadIngresoRepo
    //         .createQueryBuilder('entity')
    //         .innerJoinAndSelect(ElectricidadTipo, 'tipo', 'tipo.id = entity.tipo_electricidad_id')
    //         .select(['entity', 'tipo.nombre'])
    //         .where(`${tipoDate}(entity.fecha_ingreso) = :valueDate`, { valueDate })
    //         .getMany();
    // }


}
