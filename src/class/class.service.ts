import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { GetListsDto } from './dto/get-lists.dto';
@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async create_class(dto: CreateClassDto, professorId: string) {
    const data = await this.prisma.class.create({
      data: {
        name: dto.name,
        professorId: professorId,
      },
    });

    return data;
  }

  async list_classes(professorId:string){
    return this.prisma.class.findMany({where:{professorId:professorId}})
  }

  async get_class_lists(dto:GetListsDto){
    return this.prisma.list.findMany({where:{classId:dto.classId}})
  }


  async get_class(classId:string){
    return this.prisma.class.findUnique({where:{id:classId}})
  
  }
}
