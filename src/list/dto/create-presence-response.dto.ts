import { ApiProperty } from "@nestjs/swagger";

export class CreatePresenceResponse {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  listId?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  registration_number?: string;

  @ApiProperty()
  createdAt?: Date;
}
