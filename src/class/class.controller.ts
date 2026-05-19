import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateClassDto } from './dto/create-class.dto';
import type { RequestWithUser } from './types/request-with-user';
import { ClassService } from './class.service';
import { GetListsDto } from './dto/getLists.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createClass(
    @Body() dto: CreateClassDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: RequestWithUser,
  ) {
    return this.classService.create_class(dto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async listClasses(
    @Res({ passthrough: true }) res: Response,
    @Req() req: RequestWithUser,
  ) {
    return this.classService.list_classes(req.user.id);
  }
  @Post("/lists")
  async getLists(
    @Body() dto:GetListsDto,
    @Res({passthrough: true}) res:Response
  ){
    return this.classService.get_class_lists(dto)
  }
}
