import { TUser } from "@3205-test/common";
import FindUserDTO from "./dto/find-user.dto";

export interface UserServiceInterface {
  index(): Promise<TUser[]>;
  find(dto: FindUserDTO): Promise<TUser[] | undefined>;
}
