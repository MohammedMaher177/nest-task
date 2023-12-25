import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type TaskDocument = HydratedDocument<Task>;
@Schema()
export class Task {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;
};
export const TaskSchema = SchemaFactory.createForClass(Task);
