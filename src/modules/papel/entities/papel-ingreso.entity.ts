import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PapelTipo } from "./papel-tipo.entity";

@Entity({ name: 'tb_huellacarbono_papel_ingreso' })
export class PapelIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => PapelTipo, { eager: true })
    @JoinColumn({ name: 'tipo_papel_id' })
    tipo_papel: PapelTipo;

    @Column('bigint')
    tipo_papel_id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('date')
    fecha_ingreso: string;

    @Column('numeric', { precision: 18, scale: 6 })
    reciclado: number;

    @Column('varchar', { length: 250 })
    nombre_certificado: string;

    @Column('numeric', { precision: 18, scale: 6 })
    densidad: number;

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