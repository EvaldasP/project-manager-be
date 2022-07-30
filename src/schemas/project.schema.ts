import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  projectManager: User;

  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  workers: User[];

  @Prop([])
  tasks: [];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
