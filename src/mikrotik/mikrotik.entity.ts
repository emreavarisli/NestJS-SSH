import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('mikrotik')
export class Mikrotik extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chain: string;

    @Column()
    action: string;

    @Column()
    bytes: string;

    @Column()
    packets: string;

    @Column()
    dynamic: boolean;

    @Column()
    comment: string;
}

