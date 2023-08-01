import { Field, InputType } from "@nestjs/graphql";
import { IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class DeletePromptType {
    @ApiProperty()
    @IsString()
    @MaxLength(254)
    @Field({ nullable: false })
    id: string;
}
