export type TUser = {
  number: number;
  email: string;
};

export type TFindUserDTO = {
  email: string;
  number?: string
}
