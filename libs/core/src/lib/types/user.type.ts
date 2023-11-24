export type TUser = {
  number: number;
  email: string;
};

export type TFindUserDTO = Partial<TUser> & {
  number?: string;
}
