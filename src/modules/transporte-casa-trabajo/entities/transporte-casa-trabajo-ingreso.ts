import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_transporte_casa_trabajo_ingreso' })
export class TransporteCasaTrabajoIngreso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 250 })
    descripcion_personal: string;
    
    @Column('int')
    numero_trabajadores: number;
    
    @Column('int')
    viajes_por_semana_promedio: number;
    
    @Column('int')
    dias_laborales: number;
    
    @Column('int')
    distancia_promedio: number;

    @Column('datetime')
    fecha_ingreso: string;
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    createdAt: string;
    
    @Column('datetime')
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;

}