import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "@utils/model/base.entity";

@ObjectType()
@Entity({ name: "setting" })
class SettingsEntity extends BaseEntity {
    @Field()
    @Column({ type: Boolean, default: false })
    createAccount: boolean;

    @Field()
    @Column({ type: String, length: 254, nullable: false })
    key: string;

    @Field()
    @Column({ type: String, length: 254, nullable: false })
    accessor: string;
}

export { SettingsEntity };
