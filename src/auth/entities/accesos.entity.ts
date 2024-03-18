import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'tb_huellacarbono_acceso' })
@Unique(['user_id', 'modulo_id'])
export class Accesos {

    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column('bigint')
    user_id: number;

    @Column('bigint')
    modulo_id: number;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, user => user.accesos)
    user: User;

    @Column('varchar', { length: 6 })
    persona_ins: string;

    @Column('varchar', { length: 6, nullable: true })
    persona_upd: string;

    @Column('bit', { default: 1 })
    flag_activo: boolean;
    
    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @CreateDateColumn({ select: false })
    createdAt: Date;
    
    // @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @UpdateDateColumn({ select: false })
    updatedAt: Date;

}