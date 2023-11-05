import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chain: number;

    @Column()
    action: number;

    @Column()
    bytes: string;

    @Column()
    packets: string;

    @Column()
    dynamic: boolean;

    @Column()
    comment: string;
}

