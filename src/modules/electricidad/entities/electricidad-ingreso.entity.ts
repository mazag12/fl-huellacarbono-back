import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ElectricidadTipo } from "./electricidad-tipo.entity";

@Entity({ name: 'tb_huellacarbono_electricidad_ingreso' })
export class ElectricidadIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @OneToOne(() => ElectricidadTipo, { eager: true })
    @JoinColumn({ name: 'tipo_electricidad_id' })
    tipo_electricidad: ElectricidadTipo;

    @Column('bigint')
    tipo_electricidad_id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('date')
    fecha_ingreso: string;
    
    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;
    
    @Column('datetime', { nullable: true })
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;

}