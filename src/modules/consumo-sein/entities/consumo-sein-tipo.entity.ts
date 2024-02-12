import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_consumo_sein_tipo' })
export class ConsumoSeinTipo {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;
    
    @Column('varchar', { length: 150 })
    unidad: string;
    
    @Column('numeric', { precision: 18, scale: 6 })
    factor: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    co2: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    ch4: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    n2o: number;

    @Column('bit', { default: 1 })
    flag_activo: boolean;
    
}