import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_transporte_residuos_sed' })
export class TransporteResiduosSed {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 250 })
    nombre: string;
}