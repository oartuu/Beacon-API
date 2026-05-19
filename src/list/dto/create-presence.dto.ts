import { ApiProperty } from "@nestjs/swagger";


export class CreatePresenceDto{

    @ApiProperty()
    name!:string

    @ApiProperty()
    registration_number!:string
}