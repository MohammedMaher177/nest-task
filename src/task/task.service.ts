import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { User } from 'src/schemas/user.schema';
import { CreateTaskDTO, UpdateTaskDTO } from './taskValidation/task.validation';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}
  async findAll(
    request: Request & { user: User & { _id: string } },
  ): Promise<Task[]> {
    console.log(request.user);
    return this.taskModel.find();
  }
  async findebyId(id: string): Promise<Task | undefined> {
    return await this.taskModel.findById(id);
  }
  async createTask(
    user: User & { _id: string },
    body: CreateTaskDTO,
  ): Promise<Task> {
    const task = { ...body, user: user._id.toString() };
    return await this.taskModel.create(task);
  }
  async updateTask(
    user: User & { _id: string },
    id: string,
    body: UpdateTaskDTO,
  ): Promise<Task> {
    const task = await this.findebyId(id);
    if (task.user.toString() === user._id.toString()) {
      return await this.taskModel.findByIdAndUpdate(id, body, {
        new: true,
      });
    } else {
      throw new UnauthorizedException();
    }
  }
  async deleteTask(user_id: string, task_id: string): Promise<Task | any> {
    const task = await this.taskModel.findById(task_id);

    if (!task) {
      throw new BadRequestException('Invalid Task ID');
    }
    if (user_id.toString() !== task.user.toString()) {
      throw new UnauthorizedException();
    }
    return await this.taskModel.deleteOne({ _id: task_id });
  }
}
