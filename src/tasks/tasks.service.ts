import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { taskStatusEnum } from './task.status.enum';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, assignedTo } = createTaskDto;
    const createdTask = this.taskModel.create({
      title,
      description,
      assignedTo,
    });
    return createdTask;
  }

  async getAll(): Promise<Task[]> {
    return this.taskModel.find();
  }

  async getByID(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(
      {
        _id: id,
        title: updateTaskDto.title,
        description: updateTaskDto.description,
      },
      { new: true },
    );
  }

  async delete(id: ObjectId): Promise<Task> {
    return this.taskModel.findByIdAndDelete({ _id: id });
  }

  async addAssignees(taskid: string, userid: string[]): Promise<string> {
    return this.taskModel.findByIdAndUpdate(
      { _id: taskid },
      { assignedTo: userid },
    );
  }

  async updateStatus(id: ObjectId, newStatus: string): Promise<Task> {
    const isStatusValid = await this.validateStatusChange(id, newStatus);

    if (isStatusValid) {
      return this.taskModel.findByIdAndUpdate(
        id,
        { status: newStatus },
        { new: true },
      );
    }
  }

  async getStatus(id: ObjectId): Promise<string> {
    const { status } = await this.taskModel.findById({ _id: id });
    return status;
  }

  async validateStatusChange(
    id: ObjectId,
    newStatus: string,
  ): Promise<boolean> {
    const currentStatus = await this.getStatus(id);

    if (
      currentStatus === taskStatusEnum.OPEN &&
      newStatus === taskStatusEnum.IN_PROGRESS
    ) {
      return true;
    } else if (
      currentStatus === taskStatusEnum.IN_PROGRESS &&
      newStatus === taskStatusEnum.DONE
    ) {
      return true;
    } else if (
      currentStatus === taskStatusEnum.DONE &&
      newStatus === taskStatusEnum.IN_PROGRESS
    ) {
      return false;
    } else {
      return false;
    }
  }
}
