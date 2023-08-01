import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class ForgetType {
    @ApiProperty()
    @IsEmail()
    @MaxLength(254)
    @Field({ nullable: false })
    email: string;
}
