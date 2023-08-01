import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class VerifyType {
    @ApiProperty()
    @IsString()
    @Field({ nullable: false })
    token: string;
}
