import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ObjectId } from 'mongoose';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { LocalAuthGuard } from 'src/users/auth/local-auth.guard';
import { errorRes, successRes } from 'src/response/response';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  async getTasks(@Res() res: Response): Promise<any> {
    try {
      const allTask = await this.taskService.getAll();
      return successRes(res, HttpStatus.OK, allTask);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Get('/:id')
  async getTaskByID(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const getTask = await this.taskService.getByID(id);
      return successRes(res, HttpStatus.OK, getTask);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const addTask = await this.taskService.create(createTaskDto);
      return successRes(res, HttpStatus.CREATED, addTask);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const updateTask = await this.taskService.update(id, updateTaskDto);
      return successRes(res, HttpStatus.OK, updateTask);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: ObjectId, @Res() res: Response): Promise<any> {
    try {
      const deleteTask = await this.taskService.delete(id);
      return successRes(res, HttpStatus.OK, deleteTask);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Patch('/:id/status')
  async updateStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Param('id') id: ObjectId,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const updateTaskStatus = await this.taskService.updateStatus(
        id,
        updateTaskStatusDto.newStatus,
      );
      return successRes(res, HttpStatus.OK, updateTaskStatus);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
