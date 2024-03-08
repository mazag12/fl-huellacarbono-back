import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_huellacarbono_modulo' })
export class Modulo {
    
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column('varchar', { length: 255, nullable: true })
    nombre: string;

    @Column('varchar', { length: 255, nullable: true })
    url: string;

    @Column('varchar', { length: 255, nullable: true })
    icono: string;

    @Column('varchar', { length: 6 })
    persona_ins: string;

    @Column('varchar', { length: 6, nullable: true })
    persona_upd: string;

    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @CreateDateColumn({ select: false })
    createdAt: Date;
    
    // @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @UpdateDateColumn({ select: false })
    updatedAt: Date;
    
    @DeleteDateColumn({ select: false })
    deletedAt: Date;
}