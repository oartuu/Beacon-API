import { ApiProperty } from '@nestjs/swagger';

export class CreateClassResponse {
    
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  professorId?: string;

  @ApiProperty()
  createdAt?: Date;
}
