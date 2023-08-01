import { Field, InputType } from "@nestjs/graphql";
import { IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class CreatePromptType {
    @ApiProperty()
    @IsString()
    @MaxLength(1023)
    @Field({ nullable: false })
    key: string;

    @ApiProperty()
    @IsString()
    @MaxLength(1023)
    @Field({ nullable: false })
    title: string;
}
