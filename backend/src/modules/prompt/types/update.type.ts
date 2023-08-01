import { Field, InputType } from "@nestjs/graphql";
import { IsEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class UpdatePromptType {
    @ApiProperty()
    @IsString()
    @MaxLength(1023)
    @Field({ nullable: false })
    id: string;

    @ApiProperty()
    @MaxLength(1023)
    @Field({ nullable: true })
    key: string;

    @ApiProperty()
    @MaxLength(1023)
    @Field({ nullable: true })
    title: string;
}
