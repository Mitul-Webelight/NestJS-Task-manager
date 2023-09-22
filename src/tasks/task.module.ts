import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { TaskService } from './tasks.service';
import { Task, TaskSchema } from './task.schema';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UserModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtService],
})
export class TaskModule {}
