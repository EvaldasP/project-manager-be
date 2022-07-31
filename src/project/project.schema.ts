import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../users/user.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Object })
  projectManager: Pick<User, '_id' | 'username'>;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  workers: User[];

  @Prop({ required: true, type: [] })
  tasks: [];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
