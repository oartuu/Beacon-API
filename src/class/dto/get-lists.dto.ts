import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class GetListsDto {
    @ApiProperty()
    @IsString()
    classId!:string
}