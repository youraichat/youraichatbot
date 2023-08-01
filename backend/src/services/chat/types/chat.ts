import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class ChatType {
    @ApiProperty()
    @IsString()
    @Field({ nullable: false })
    question: string;
}
