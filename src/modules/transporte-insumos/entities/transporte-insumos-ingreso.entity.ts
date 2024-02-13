import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransporteInsumosTipo } from "./transporte-insumos-tipo.entity";

export class TransporteInsumosIngreso {
    
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @OneToOne(() => TransporteInsumosTipo, { eager: true })
    @JoinColumn({ name: 'tipo_transporte_insumos_id' })
    tipo_transporte_insumos: TransporteInsumosTipo;

    @Column('bigint')
    tipo_transporte_insumos_id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('date')
    fecha_ingreso: string;

    @Column('varchar', { length: 250 })
    descripcion_carga: string;
    
    @Column('int')
    viajes_totales: number;

    @Column('numeric', { precision: 18, scale: 6 })
    tramo_viaje: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    peso: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    distancia: number;

    @Column('varchar', { length: 255 })
    area: string;
    
    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;
    
    @Column('datetime', { nullable: true })
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;

}