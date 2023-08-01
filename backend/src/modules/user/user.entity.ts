import { Column, Entity, ManyToMany, JoinTable } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "@utils/model/base.entity";
import { PromptEntity } from "@modules/prompt/prompt.entity";

enum USER_ROLE {
    ADMIN = "adm",
    MANAGER = "mng",
    SUPPORT = "spt",
    USER = "usr",
}

@ObjectType()
@Entity({ name: "users" })
class UserEntity extends BaseEntity {
    @Field()
    @Column({
        type: "enum",
        enum: USER_ROLE,
        default: USER_ROLE.USER,
        nullable: false,
    })
    role: USER_ROLE;

    @Field()
    @Column({ type: String, length: 254, unique: true, nullable: false })
    email: string;

    @Field()
    @Column({ default: false })
    emailVerified: boolean;

    @Field()
    @Column({ type: String, length: 1023, nullable: false })
    password: string;

    @Field()
    @Column({ type: "varchar", length: 255 })
    firstname: string;

    @Field()
    @Column({ type: "varchar", length: 255 })
    lastname: string;

    @Column({ type: "varchar", length: 255 })
    vToken: string;

    @Column({ type: "varchar", length: 255 })
    vCode: string;

    @Field()
    @Column({ type: String, nullable: true })
    photo: string;

    @Field()
    @ManyToMany(() => PromptEntity, (prompt: PromptEntity) => prompt.id, { cascade: true, nullable: true })
    @JoinTable({
        name: "user_prompt",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "prompt_id",
            referencedColumnName: "id",
        },
    })
    prompts: PromptEntity[];
}

export { UserEntity, USER_ROLE };
