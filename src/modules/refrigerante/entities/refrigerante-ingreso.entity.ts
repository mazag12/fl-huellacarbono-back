import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RefrigeranteEquipo } from "./refrigerante-equipo.entity";
import { RefrigeranteTipo } from "./refrigerante-tipo.entity";

@Entity({ name: 'tb_huellacarbono_refrigerante_ingreso' })
export class RefrigeranteIngreso {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => RefrigeranteTipo, refrigerante_tipo => refrigerante_tipo.id)
    @JoinColumn({ name: 'refrigerante_tipo_id' })
    refrigenrante_tipo: RefrigeranteTipo;

    @Column('int')
    refrigerante_tipo_id: number;

    @OneToOne(() => RefrigeranteEquipo, refrigerante_equipo => refrigerante_equipo.id)
    @JoinColumn({ name: 'refrigerante_equipo_id' })
    refrigerante_equipo: RefrigeranteEquipo;

    @Column('int')
    refrigerante_equipo_id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    capacidad_carga: number;
    
    @Column('numeric', { precision: 18, scale: 6 })
    porcentaje_fuga: number;
    
    @Column('datetime')
    fecha_ingreso: string;

    @Column('varchar', { length: 250 })
    tipo_operacion: string;

    @Column('numeric', { precision: 18, scale: 6 })
    tiempo_uso: number;

    @Column('numeric', { precision: 18, scale: 6 })
    fraccion_disposicion: number;

    @Column('numeric', { precision: 18, scale: 6 })
    fraccion_recuperacion: number;
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    createdAt: string;
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;

}