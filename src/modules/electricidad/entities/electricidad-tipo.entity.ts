import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_electricidad_tipo' })
export class ElectricidadTipo {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar', { length: 250 })
    nombre: string;
    
    @Column('numeric', { precision: 18, scale: 6 })
    unidad: number;
    
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
}