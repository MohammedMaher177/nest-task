import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, // Register UserModel here
      { name: Task.name, schema: TaskSchema },
    ]),
    UserModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController, AuthController, TaskController],
  providers: [AppService, AuthService, TaskService, AuthGuard],
})
export class AppModule {}
