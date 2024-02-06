import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_papel_tipo' })
export class PapelTipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 250 })
    nombre: string;

    @Column('varchar', { length: 150 })
    unidad: string;
    
    @Column('numeric', { precision: 18, scale: 6 })
    co2: number;

}