import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_transporte_residuos_tipo' })
export class TransporteResiduosTipo {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar', { length: 250 })
    nombre: string;
    
    @Column('varchar', { length: 50 })
    unidad: string;
    
    @Column('numeric', { precision: 18, scale: 2 })
    doc: number;
    
    @Column('numeric', { precision: 18, scale: 2 })
    gwp: number;

}