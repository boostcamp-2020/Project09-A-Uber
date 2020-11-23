import bcrypt from 'bcrypt';

const saltRounds = 10;

export const encryptPassword = (password: string): string => {
  const hashPassword = bcrypt.hashSync(password, saltRounds);

  return hashPassword;
};

export const isComparedPassword = (password: string, hashPassword: string): boolean => {
  const isCompared = bcrypt.compareSync(password, hashPassword);

  return isCompared;
};
