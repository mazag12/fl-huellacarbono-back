import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Accesos } from './accesos.entity';

@Entity({ name: 'tb_huellacarbono_user' })
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true, length: 6 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  apellido: string;

  @Column({ type: 'bit', default: 1 })
  isActive: boolean;

  @OneToMany(() => Accesos, (accesos) => accesos.user, { eager: true })
  accesos: Accesos;

  @Column('varchar', { default: 'USER' })
  role: string; // 'ADMIN' | 'USER';

}
