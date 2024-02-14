import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransporteTerrestreTipo } from "./transporte-terrestre-tipo.entity";

@Entity({ name: 'tb_huellacarbono_transporte_terrestre_ingreso' })
export class TransporteTerrestreIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => TransporteTerrestreTipo, { eager: true })
    @JoinColumn({ name: 'tipo_transporte_terrestre_id' })
    tipo_transporte_terrestre: TransporteTerrestreTipo;

    @Column('bigint')
    tipo_transporte_terrestre_id: number;

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

    @Column('bit')
    flag_ida_vuelta: boolean;
    
    @Column('int')
    numero_recorridos: number;
    
    @Column('int')
    numero_personas: number;

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