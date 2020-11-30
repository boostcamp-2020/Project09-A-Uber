import { Request } from 'express';
import { LoginType } from '@models/user';

interface User {
  _id: string;
  type: LoginType;
}

export interface RequestWithUser extends Request {
  user?: User;
}
