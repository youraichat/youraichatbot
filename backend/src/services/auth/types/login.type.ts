import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class LoginType {
    @ApiProperty()
    @IsEmail()
    @MaxLength(254)
    @Field({ nullable: false })
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100)
    @Field({ nullable: false })
    password: string;
}
