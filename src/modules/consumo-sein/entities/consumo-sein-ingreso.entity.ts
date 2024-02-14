import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConsumoSeinTipo } from "./consumo-sein-tipo.entity";

@Entity({ name: 'tb_huellacarbono_consumo_sein_ingreso' })
export class ConsumoSeinIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => ConsumoSeinTipo, { eager: true })
    @JoinColumn({ name: 'tipo_consumo_sein_id' })
    tipo_consumo_sein: ConsumoSeinTipo;

    @Column('bigint', { nullable: false, unique: false })
    tipo_consumo_sein_id: number;

    @Column('varchar', { length: 150, nullable: false })
    suministro: string;

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

    @Column('varchar', { length: 6, nullable: false })
    persona_upsert: string;
}