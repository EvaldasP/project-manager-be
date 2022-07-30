// import * as mongoose from 'mongoose';

// export const UserSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// export enum Roles {
//   Employee = 'Employee',
//   ProjectManager = 'Project Manager',
// }

// export interface User extends mongoose.Document {
//   _id: string;
//   username: string;
//   password: string;
//   role: Roles;
// }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
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
