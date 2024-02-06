import { Column, PrimaryGeneratedColumn } from "typeorm";

export class TransporteAereoIngreso {

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
    
    @Column('int')
    numero_personas: number;
    
    @Column('int')
    numero_recorridos: number;
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    createdAt: string;
    
    @Column('datetime')
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;
    
}