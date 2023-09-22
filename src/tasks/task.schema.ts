import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { taskStatusEnum } from './task.status.enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ versionKey: false, timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: taskStatusEnum.OPEN })
  status: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: process.env.REF }] })
  assignedTo: User[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
