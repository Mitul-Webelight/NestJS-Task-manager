import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../users/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ versionKey: false, timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 'OPEN' })
  status: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  assignedTo: User[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
