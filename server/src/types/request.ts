import { Request } from 'express';

interface User {
  _id: string;
  name: string;
  type: string;
}

export interface RequestWithUser extends Request {
  user?: User;
}
