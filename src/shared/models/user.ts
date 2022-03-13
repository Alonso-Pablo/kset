import { ObjectId } from 'mongoose'

export interface UserInterface {
  id?: string;
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  date: Date;
}
