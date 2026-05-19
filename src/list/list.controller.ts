import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { RequestWithUser } from '@/class/types/request-with-user';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ListResponse, ListResponseWithItems } from './dto/list-response.dto';
import { CreatePresenceResponse } from './dto/create-presence-response.dto';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type:ListResponse
  })
  @Post('create')
  async createClass(
    @Body() dto: CreateListDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: RequestWithUser,
  ) {
    return this.listService.create_list(dto, req.user.id);
  }

  @ApiOkResponse({
    type:CreatePresenceResponse
  })
  @Post(':token')
  createPresence(@Param('token') token: string, @Body() dto: CreatePresenceDto) {
    return this.listService.create_presence(token, dto);
  }


  @ApiOkResponse({
    type:ListResponseWithItems
  })
  @Get(':token')
  getList(@Param('token') token: string,) {
    return this.listService.get_list_by_id( token);
  }
}
