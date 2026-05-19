import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator"

export class LoginDto {
  @ApiProperty()
  @IsString()
  registration_number!: string;
  
  @ApiProperty()
  @IsString()
  password!: string;
}