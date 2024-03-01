import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RefrigeranteEquipo } from "./refrigerante-equipo.entity";
import { RefrigeranteTipo } from "./refrigerante-tipo.entity";

@Entity({ name: 'tb_huellacarbono_refrigerante_ingreso' })
export class RefrigeranteIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => RefrigeranteTipo, { eager: true })
    @JoinColumn({ name: 'tipo_refrigerante_id' })
    tipo_refrigerante: RefrigeranteTipo;

    @Column('bigint')
    tipo_refrigerante_id: number;

    @ManyToOne(() => RefrigeranteEquipo, { eager: true })
    @JoinColumn({ name: 'equipo_refrigerante_id' })
    equipo_refrigerante: RefrigeranteEquipo;

    @Column('bigint')
    equipo_refrigerante_id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    capacidad_carga: number;

    @Column('numeric', { precision: 18, scale: 6 })
    fuga_instalacion: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    porcentaje_fuga: number;
    
    @Column('date')
    fecha_ingreso: string;

    @Column('numeric', { precision: 18, scale: 6 })
    fuga_uso: number;

    @Column('numeric', { precision: 18, scale: 6 })
    tiempo_uso: number;

    @Column('numeric', { precision: 18, scale: 6 })
    fraccion_disposicion: number;

    @Column('numeric', { precision: 18, scale: 6 })
    fraccion_recuperacion: number;

    @Column('varchar', { length: 255 })
    area: string;
    
    @Column('varchar', { length: 'MAX', default: '' })
    evidencia_url: string;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;
    
    @Column('datetime', { nullable: true })
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;

}