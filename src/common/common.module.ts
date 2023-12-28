/* eslint-disable prettier/prettier */
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [UserModule, TaskModule],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class CommonModule {}
