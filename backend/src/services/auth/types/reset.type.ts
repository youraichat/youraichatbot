import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class ResetType {
    @ApiProperty()
    @IsString()
    @MaxLength(254)
    @Field({ nullable: false })
    token: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @Field({ nullable: false })
    newPass: string;
}
