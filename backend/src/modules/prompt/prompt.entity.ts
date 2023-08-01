import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "@utils/model/base.entity";
import { UserEntity } from "@modules/user/user.entity";

@ObjectType()
@Entity({ name: "prompts" })
class PromptEntity extends BaseEntity {
    @Field()
    @Column({ type: String, length: 254, nullable: false })
    title: string;

    @Field()
    @Column({ type: String, length: 254, nullable: true })
    photo: string;

    @Field()
    @Column({ type: String, length: 254, nullable: false })
    key: string;

    @ManyToMany(() => UserEntity, (user) => user.id, { cascade: true, nullable: true })
    users?: UserEntity[];
}

export { PromptEntity };
