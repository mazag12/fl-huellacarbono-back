import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransporteResiduosTipo } from "./transporte-residuos-tipo.entity";
import { TransporteResiduosSed } from "./transporte-residuos-sed.entity";

@Entity({ name: 'tb_huellacarbono_transporte_residuos_ingreso' })
export class TransporteResiduosIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => TransporteResiduosTipo, { eager: true })
    @JoinColumn({ name: 'tipo_transporte_residuos_id' })
    tipo_transporte_residuos: TransporteResiduosTipo;

    @Column('bigint')
    tipo_transporte_residuos_id: number;

    @ManyToOne(() => TransporteResiduosSed, { eager: true })
    @JoinColumn({ name: 'sed_transporte_residuos_id' })
    sed_transporte_residuos: TransporteResiduosSed;

    @Column('bigint')
    sed_transporte_residuos_id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('date')
    fecha_ingreso: string;

    @Column('bit')
    flag_alto_contenido_aceite_grasa: boolean;

    @Column('varchar', { length: 250 })
    condiciones: string;

    @Column('numeric', { precision: 18, scale: 6 })
    temperatura: number;

    @Column('date')
    precipitacion: string;
    
    @Column('numeric', { precision: 18, scale: 6 })
    crecimiento_anual: number;

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