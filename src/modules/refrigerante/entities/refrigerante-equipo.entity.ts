import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_refrigerante_equipo' })
export class RefrigeranteEquipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50, nullable: false })
    nombre: string;

}