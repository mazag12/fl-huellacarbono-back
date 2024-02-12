import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransporteAereoTipo } from "./transporte-aereo-tipo.entity";

export class TransporteAereoIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @OneToOne(() => TransporteAereoTipo, { eager: true })
    @JoinColumn({ name: 'tipo_transporte_aereo_id' })
    tipo_transporte_aereo: TransporteAereoTipo;

    @Column('bigint')
    tipo_transporte_aereo_id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('date')
    fecha_ingreso: string;

    @Column('varchar', { length: 250 })
    factura: string;
    
    @Column('numeric', { precision: 18, scale: 6 })
    tramo: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    distancia: number;
    
    @Column('int')
    numero_personas: number;
    
    @Column('int')
    numero_recorridos: number;
    
    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;
    
    @Column('datetime', { nullable: true })
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;
    
}