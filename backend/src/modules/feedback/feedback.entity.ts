import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "@utils/model/base.entity";
import { UserEntity } from "@modules/user/user.entity";
import { PromptEntity } from "@modules/prompt/prompt.entity";

@ObjectType()
@Entity({ name: "feedback" })
class FeedbackEntity extends BaseEntity {
    @Field()
    @Column({ type: String, length: 254, nullable: true })
    title: string;

    @Field()
    @Column({ type: "text", nullable: true })
    description: string;

    @Field()
    @Column({ type: Boolean, default: false })
    like: boolean;

    @Field()
    @Column({ type: Number, default: false })
    rate: number;

    @Field()
    @Column({ type: "text", nullable: true })
    messages: string;

    @Field()
    @Column({ type: "text", nullable: true })
    question: string;

    @Field()
    @Column({ type: "text", nullable: true })
    answer: string;

    @Field()
    @Column({ type: "simple-array", nullable: true })
    screenshot: string[];

    @Field()
    @ManyToOne(() => PromptEntity, (prompt: PromptEntity) => prompt.id, {
        nullable: false,
        cascade: true,
    })
    @JoinColumn()
    prompt: PromptEntity;

    @Field()
    @ManyToOne(() => UserEntity, (user: UserEntity) => user.id, {
        nullable: false,
        cascade: true,
    })
    @JoinColumn()
    author: UserEntity;
}

export { FeedbackEntity };
