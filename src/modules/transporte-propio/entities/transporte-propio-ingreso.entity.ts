import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransportePropioTipo } from "./transporte-propio-tipo.entity";

export class TransportePropioIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => TransportePropioTipo, { eager: true })
    @JoinColumn({ name: 'tipo_transporte_propio_id' })
    tipo_transporte_propio: TransportePropioTipo;

    @Column('bigint')
    tipo_transporte_propio_id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('date')
    fecha_ingreso: string;

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