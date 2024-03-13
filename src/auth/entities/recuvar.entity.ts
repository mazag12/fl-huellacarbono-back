import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//@Entity({ name: 'tb_huellacarbono_user' })
export class Recovery {
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

}