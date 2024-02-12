import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConsumoSeinTipo } from "./consumo-sein-tipo.entity";

@Entity({ name: 'tb_huellacarbono_consumo_sein_ingreso' })
export class ConsumoSeinIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @OneToOne(() => ConsumoSeinTipo, { eager: true })
    @JoinColumn({ name: 'consumo_sein_tipo_id' })
    consumo_sein_tipo: ConsumoSeinTipo;

    @Column('bigint', { nullable: false })
    consumo_sein_tipo_id: number;

    @Column('varchar', { length: 150, nullable: false })
    suministro: string;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('date')
    fecha_ingreso: string;
    
    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;
    
    @Column('datetime', { nullable: true })
    updatedAt: string;

    @Column('varchar', { length: 6, nullable: false })
    persona_upsert: string;
}