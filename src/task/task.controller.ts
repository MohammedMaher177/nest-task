import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/schemas/task.schema';
import { User } from 'src/schemas/user.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateTaskDTO } from './taskValidation/task.validation';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllTassks(
    @Request() request: Request & { user: User & { _id: string } },
  ): Promise<Task[]> {
    return await this.taskService.findAll(request);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() request: Request & { user: User & { _id: string } },
    @Body() body: CreateTaskDTO,
  ): Promise<Task> {
    return await this.taskService.createTask(request.user, body);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Request() request: Request & { user: User & { _id: string } },
    @Body() body: CreateTaskDTO,
    @Param('id') id: string,
  ): Promise<Task> {
    return await this.taskService.updateTask(request.user, id, body);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTask(
    @Request() request: Request & { user: User & { _id: string } },
    @Param('id') id: string,
  ): Promise<Task | any> {
    return await this.taskService.deleteTask(request.user._id, id);
  }
}
