import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        length: 255
    })
    email: string;

    @Column({ 
        type: 'varchar', 
        select: false
    })
    password: string

    @Column({ type: 'varchar' })
    fullName: string;

    @Column({ type: 'varchar' })
    cargo: string;

    @Column({ type: 'varchar' })
    locacion: string;

    @Column( {
        type: 'bit',
        default: 1
    })
    isActive: number;

    @Column('text', {
        default: 'user'
    })
    roles: string; //'user','admin'

    

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }

}
