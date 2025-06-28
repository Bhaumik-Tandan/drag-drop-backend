import { Exclude } from 'class-transformer';
export class User {
  id: number;
  email: string;
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}