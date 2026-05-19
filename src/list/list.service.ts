import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { randomUUID } from 'crypto'
import { CreateListDto } from './dto/createList.dto';
import { CreatePresenceDto } from './dto/createPresence.dto';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async create_list(dto: CreateListDto, professorId: string) {
    // garante que a turma pertence ao professor
    const validClass = await this.prisma.class.findUnique({
      where: { id: dto.classId, professorId },
    });

    if (!validClass) {
      throw new ForbiddenException('Turma não encontrada');
    }

    return this.prisma.list.create({
      data: {
        name: dto.name,

        classId: dto.classId,

        shareToken: randomUUID(),
      },
    });
  }

  async create_presence(token: string, dto: CreatePresenceDto) {
    const lista = await this.prisma.list.findUnique({
      where: {
        shareToken: token,
      },
    });

    if (!lista) {
      throw new NotFoundException('Lista não encontrada');
    }

    if (!lista.isOpen) {
      throw new BadRequestException('Lista fechada');
    }

    return this.prisma.listItem.create({
      data: {
        name: dto.name,
        registration_number: dto.registration_number,

        listId: lista.id,
      },
    });
  }

  async get_list_by_id(token:string){
    const validList = await this.prisma.list.findUnique({where:{shareToken: token}, include:{itens: true}})
     
    if (!validList){
        throw new NotFoundException('lista não encontrada aqui')
    }

    return validList
  }

}
