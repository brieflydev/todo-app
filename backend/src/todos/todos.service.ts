import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto, userId: string) {
    return await this.prisma.prisma.todo.create({
      data: {
        name: createTodoDto.name,
        completed: createTodoDto.completed ?? false,
        userId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.prisma.todo.findMany({
      where: { userId },
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, userId: string) {
    const todo = await this.prisma.prisma.todo.findUnique({
      where: { id },
    });
    
    if (!todo || todo.userId !== userId) {
      throw new ForbiddenException('Todo not found or access denied');
    }

    return this.prisma.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: string, userId: string) {
    const todo = await this.prisma.prisma.todo.findUnique({
      where: { id },
    });
    
    if (!todo || todo.userId !== userId) {
      throw new ForbiddenException('Todo not found or access denied');
    }

    return this.prisma.prisma.todo.delete({
      where: { id },
    });
  }
}
