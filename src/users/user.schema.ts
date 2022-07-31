import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  role: Roles;
}

export enum Roles {
  SuperAdmin = 'Super Admin',
  Employee = 'Employee',
  ProjectManager = 'Project Manager',
}

export const UserSchema = SchemaFactory.createForClass(User);
