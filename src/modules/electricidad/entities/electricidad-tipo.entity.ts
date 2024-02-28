import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_electricidad_tipo' })
export class ElectricidadTipo {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;
    
    @Column('varchar', { length: 250 })
    nombre: string;
    
    @Column('varchar', { length: 250 })
    unidad: string;
    
    @Column('numeric', { precision: 18, scale: 6 })
    factor: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    valor_neto: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    co2: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    ch4: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    n2o: number;

    @Column('bit', { default: 1 })
    flag_activo: boolean;
}