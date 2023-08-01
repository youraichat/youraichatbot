import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class RegisterType {
    @ApiProperty()
    @IsString()
    @MaxLength(254)
    @Field({ nullable: false })
    firstname: string;

    @ApiProperty()
    @IsString()
    @MaxLength(254)
    @Field({ nullable: false })
    lastname: string;

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
