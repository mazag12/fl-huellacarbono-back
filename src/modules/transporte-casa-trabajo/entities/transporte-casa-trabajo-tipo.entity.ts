import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_transporte_casa_trabajo_tipo' })
export class TransporteCasaTrabajoTipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 250, nullable: false })
    nombre: string;
    
    @Column('numeric', { precision: 18, scale: 6 })
    co2: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    ch4: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    n2o: number;
    
}