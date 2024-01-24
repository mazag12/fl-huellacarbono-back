import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_combustible_a1_a2')
export class Combustiblea1 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    nombre: string;

    @Column({ type: 'varchar' })
    unidad: string;

    @Column({ type: 'decimal' , precision: 18, scale: 3 })
    factor: number;

    @Column({ type: 'decimal' , precision: 18, scale: 6 })
    neto: number;

    @Column({ type: 'decimal' , precision: 18, scale: 2 })
    co2: number;

    @Column({ type: 'decimal' , precision: 18, scale: 2 })
    ch4: number;

    @Column({ type: 'decimal' , precision: 18, scale: 2 })
    n2o: number;

    

}
