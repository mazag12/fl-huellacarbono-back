import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_fuga_sf6_ingreso' })
export class FugaSf6Ingreso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    capacidad_carga: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    fuga_instalacion: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    tiempo_uso: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    fuga_uso: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    fraccion_disposicion: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    fraccion_recuperado: number;
    
    @Column('datetime')
    fecha_ingreso: string;
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    createdAt: string;
    
    @Column('datetime')
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;


}