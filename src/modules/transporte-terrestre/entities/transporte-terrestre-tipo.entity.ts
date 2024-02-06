import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_transporte_terrestre_tipo' })
export class TransporteTerrestreTipo{

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 250, nullable: false })
    nombre: string;
    
    @Column('numeric', { precision: 18, scale: 4 })
    co2: number;
    
    @Column('numeric', { precision: 18, scale: 4 })
    ch4: number;
    
    @Column('numeric', { precision: 18, scale: 4 })
    n2o: number;

}