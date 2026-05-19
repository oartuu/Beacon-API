import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register_Professor(dto: RegisterDto) {
    const existingProfessor = await this.prisma.professor.findUnique({
      where: { registration_number: dto.registration_number },
    });

    if (existingProfessor) {
      throw new BadRequestException('matrícula já existente');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.professor.create({
      data: {
        password: hashedPassword,
        registration_number: dto.registration_number,
        name: dto.name,
      },
    });
    return user;
  }

  async login(dto: LoginDto) {
    const validUser = await this.prisma.professor.findUnique({
      where: { registration_number: dto.registration_number },
    });

    if (!validUser) {
      throw new UnauthorizedException('usuário ou senha inválidos');
    }

    const passwordMatch = await bcrypt.compare(
      dto.password,
      validUser.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('usuário ou senha inválidos senha');
    }

    const payload = {
      sub: validUser.id,
      registration_number: validUser.registration_number,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token
    };
  }
}
