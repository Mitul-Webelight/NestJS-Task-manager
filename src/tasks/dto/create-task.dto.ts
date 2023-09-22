import { taskStatusEnum } from '../task.status.enum';

export interface CreateTaskDto {
  title: string;
  description: string;
  assignedTo: string;
  status: taskStatusEnum;
}
