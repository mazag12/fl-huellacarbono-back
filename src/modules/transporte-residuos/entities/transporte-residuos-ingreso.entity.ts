import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_transporte_residuos_ingreso' })
export class TransporteResiduosIngreso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    cantidad: number;
    
    @Column('datetime')
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
    
    @Column('datetime', { default: 'CURRENT_TIMESTAMP()' })
    createdAt: string;
    
    @Column('datetime')
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;


}