import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_papel_ingreso' })
export class PapelIngreso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('datetime')
    fecha_ingreso: string;

    @Column('numeric', { precision: 18, scale: 6 })
    reciclado: number;

    @Column('varchar', { length: 250 })
    nombre_certificado: string;

    @Column('numeric', { precision: 18, scale: 6 })
    densidad: number;
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    createdAt: string;
    
    @Column('datetime')
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;

}