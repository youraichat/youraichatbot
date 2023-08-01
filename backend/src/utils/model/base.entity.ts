import { Field, ObjectType } from "@nestjs/graphql";
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

@ObjectType()
abstract class BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Field()
    @Column({ type: "boolean", default: true })
    isActive: boolean;

    @Field()
    @Column({ type: "boolean", default: false })
    isArchived: boolean;

    @Field()
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}

export { BaseEntity };
