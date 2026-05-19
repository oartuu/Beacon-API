import { ApiProperty } from "@nestjs/swagger";
import { CreatePresenceResponse } from "./create-presence-response.dto";

export class ListResponse {
    
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  classId?: string;

  @ApiProperty()
  isOpen?: boolean;

  @ApiProperty()
  shareToken?: string;

  @ApiProperty()
  secret: any;

  @ApiProperty()
  codeWindow?: number;

  @ApiProperty()
  createdAt?: Date;
}

export class CreatePResenceResponse {
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
export class ListResponseWithItems {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  classId?: string;

  @ApiProperty()
  isOpen?: boolean;

  @ApiProperty()
  shareToken?: string;

  @ApiProperty()
  secret: any;

  @ApiProperty()
  codeWindow?: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty({
    type:[CreatePresenceResponse]
  })
  items?:CreatePresenceResponse[]
}
