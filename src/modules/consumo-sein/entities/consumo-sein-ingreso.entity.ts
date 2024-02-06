import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_consumo_sein_ingreso' })
export class ConsumoSeinIngreso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    suministro: string;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('datetime')
    fecha_ingreso: string;
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    createdAt: string;
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    updatedAt: string;

    @Column('varchar', { length: 6, nullable: false })
    persona_upsert: string;
}