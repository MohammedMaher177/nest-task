import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { User } from 'src/schemas/user.schema';

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
}
