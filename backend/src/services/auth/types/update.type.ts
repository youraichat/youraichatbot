import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class UpdateProfileType {
    @ApiProperty()
    @MaxLength(254)
    @Field({ nullable: true })
    firstname: string;

    @ApiProperty()
    @MaxLength(254)
    @Field({ nullable: true })
    lastname: string;

    @ApiProperty()
    @IsEmail()
    @MaxLength(254)
    @Field({ nullable: true })
    email: string;
}
