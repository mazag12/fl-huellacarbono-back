import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransporteCasaTrabajoTipo } from "./transporte-casa-trabajo-tipo.entity";

@Entity({ name: 'tb_huellacarbono_transporte_casa_trabajo_ingreso' })
export class TransporteCasaTrabajoIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => TransporteCasaTrabajoTipo, { eager: true })
    @JoinColumn({ name: 'tipo_transporte_casa_trabajo_id' })
    tipo_transporte_casa_trabajo: TransporteCasaTrabajoTipo;

    @Column('bigint')
    tipo_transporte_casa_trabajo_id: number;

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

    @Column('date')
    fecha_ingreso: string;

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