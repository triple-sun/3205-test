import { TUser } from "@3205-test/common";
import FindUserDTO from "./dto/find-user.dto";

export interface IUserService {
  index(): Promise<TUser[]>;
  find(dto: FindUserDTO): Promise<TUser[] | undefined>;
}
