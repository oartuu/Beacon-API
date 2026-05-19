import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { RequestWithUser } from '@/class/types/request-with-user';
import { ListService } from './list.service';
import { CreateListDto } from './dto/createList.dto';
import { CreatePresenceDto } from './dto/createPresence.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createClass(
    @Body() dto: CreateListDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: RequestWithUser,
  ) {
    return this.listService.create_list(dto, req.user.id);
  }

  @Post(':token')
  createPresence(@Param('token') token: string, @Body() dto: CreatePresenceDto) {
    return this.listService.create_presence(token, dto);
  }

  @Get(':token')
  getList(@Param('token') token: string,) {
    return this.listService.get_list_by_id( token);
  }
}
