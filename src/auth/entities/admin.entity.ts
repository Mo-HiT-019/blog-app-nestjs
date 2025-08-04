import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin{
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @CreateDateColumn()
    createdAt:Date;

}