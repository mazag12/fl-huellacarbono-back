import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_transporte_terrestre_ingreso' })
export class TransporteTerrestreIngreso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('datetime')
    fecha_ingreso: string;

    @Column('varchar', { length: 250 })
    factura: string;

    @Column('numeric', { precision: 18, scale: 6 })
    tramo: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    distancia: number;

    @Column('bit')
    flag_ida_vuelta: boolean;
    
    @Column('int')
    numero_recorridos: number;
    
    @Column('int')
    numero_personas: number;
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    createdAt: string;
    
    @Column('datetime')
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;

}