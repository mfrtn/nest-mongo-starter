import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  CUSTOMER = 'CUSTOMER',
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    trim: true,
    index: true,
    match: /^[a-zA-Z][a-zA-Z0-9]*(?:[._-][a-zA-Z0-9]+)*$/,
    unique: true,
    sparse: true,
    lowercase: true,
  })
  username?: string;

  @Prop({
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    match: /^09[0-9]{9}$/,
  })
  mobile?: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role;

  @Prop({
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  // @Prop()
  // categories?: Category[];

  // @Prop()
  // orders?: Order[];
}

export const UserSchema = SchemaFactory.createForClass(User);
