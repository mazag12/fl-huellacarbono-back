import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_agua_ingreso',  })
export class AguaIngreso {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column('numeric', { precision: 18, scale: 6 })
    medidor: number;
    
    @Column('date')
    fecha_ingreso: string;
    
    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;
    
    @Column('datetime', { nullable: true })
    updatedAt: string;

    @Column('varchar', { length: 6 })
    persona_upsert: string;
    
}