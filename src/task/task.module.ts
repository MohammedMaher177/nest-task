import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/task.schema';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TaskService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
