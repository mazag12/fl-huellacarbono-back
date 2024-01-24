import { Combustiblea1 } from 'src/combustiblea1/entities/combustiblea1.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tb_electricidad')
export class Electricida {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date" })
    fecha: Date;

    @Column({ type: 'varchar' , unique: true })
    factura: string;

    @Column({ type: 'tinyint' })
    tipocombustible: number;

    @Column({ type: 'float' })
    cantidad: number;

    @Column({ type: 'varchar' })
    evidencia?: string;

    @Column({ type: 'varchar' })
    mes: string;

}
