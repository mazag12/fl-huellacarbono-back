import { Column, PrimaryGeneratedColumn } from "typeorm";

export class TransporteInsumosIngreso {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('datetime')
    fecha_ingreso: string;

    @Column('varchar', { length: 250 })
    descripcion_carga: string;
    
    @Column('int')
    viajes_totales: number;

    @Column('numeric', { precision: 18, scale: 6 })
    tramo_viaje: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    peso: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    distancia: number;
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    createdAt: string;
    
    @Column('datetime')
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;

}