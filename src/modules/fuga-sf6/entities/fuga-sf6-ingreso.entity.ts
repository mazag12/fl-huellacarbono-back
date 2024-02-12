import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FugaSf6Tipo } from "./fuga-sf6-tipo.entity";

@Entity({ name: 'tb_huellacarbono_fuga_sf6_ingreso' })
export class FugaSf6Ingreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @OneToOne(() => FugaSf6Tipo, { eager: true })
    @JoinColumn({ name: 'tipo_fuga_sf6_id' })
    tipo_fuga_sf6: FugaSf6Tipo;

    @Column('bigint')
    tipo_fuga_sf6_id: number;

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
    
    @Column('date')
    fecha_ingreso: string;
    
    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;
    
    @Column('datetime', { nullable: true })
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;


}