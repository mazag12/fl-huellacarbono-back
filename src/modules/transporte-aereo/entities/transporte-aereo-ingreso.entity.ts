import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransporteAereoTipo } from "./transporte-aereo-tipo.entity";

@Entity({ name: 'tb_huellacarbono_transporte_aereo_ingreso' })
export class TransporteAereoIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => TransporteAereoTipo, { eager: true })
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

    @Column('varchar', { length: 255 })
    area: string;

    @Column('varchar', { length: 'MAX', default: '' })
    evidencia_url: string;
    
    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;
    
    @Column('datetime', { nullable: true })
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;
    
}