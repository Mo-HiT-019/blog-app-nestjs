import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";

@Entity()
export class Blog{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;

    @Column({unique:true})
    slug:string;

    @Column('text')
    content:string;

    @Column('text',{array:true,nullable:true})
    tags:string[];

    @Column({nullable:true})
    imageUrl:string

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;
}