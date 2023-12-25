import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/schemas/task.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/schemas/user.schema';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @UseGuards(AuthGuard)
  @Get()
  async getAllTassks(
    @Request() request: Request & { user: User & { _id: string } },
  ): Promise<Task[]> {
    return await this.taskService.findAll(request);
  }
}
