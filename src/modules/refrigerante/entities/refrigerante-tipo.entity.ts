import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_refrigerante_tipo' })
export class RefrigeranteTipo {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    nombre: string;

    @Column('bit', { default: 1 })

    flag_activo: boolean;
}