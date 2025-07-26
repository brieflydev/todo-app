import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    const userId = req.user.userId;
    return await this.todosService.create(createTodoDto, userId);
  }

  @Get()
  async findAll(@Request() req) {
    const userId = req.user.userId;
    return await this.todosService.findAll(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Request() req) {
    const userId = req.user.userId;
    return this.todosService.update(id, updateTodoDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.todosService.remove(id, userId);
  }
}
