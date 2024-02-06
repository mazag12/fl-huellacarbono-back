import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_fuga_sf6_tipo' })
export class FugaSf6Tipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 250, nullable: false })
    nombre: string;
    
    @Column('numeric', { precision: 18, scale: 6 })
    co2: number;

}