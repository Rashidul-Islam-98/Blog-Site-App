
export interface IUser {
  userId: number,
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUserInputDTO {
  userId: number,
  name: string;
  email: string;
  password: string;
}
