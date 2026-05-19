import { ApiProperty } from "@nestjs/swagger";


export class RegisterResponse {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  registration_number?: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  createdAt?: Date;
}
