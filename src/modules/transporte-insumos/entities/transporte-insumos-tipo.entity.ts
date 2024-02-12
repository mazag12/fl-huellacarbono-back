import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_transporte_insumos_tipo' })
export class TransporteInsumosTipo {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column('varchar', { length: 250, nullable: false })
    nombre: string;

    @Column('numeric', { precision: 18, scale: 6 })
    co2: number;
    
    @Column('bit')
    flag_activo: boolean;
}