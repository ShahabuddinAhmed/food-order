import { Repo } from "../../../../shared/infra/Repo";
import UserModel from "../../infra/models/user";
import { User } from "../entity/user";

export interface UserRepoInterface extends Repo<User> {
    create(user: User): Promise<User | null>;
    getByEmail(email: string): Promise<UserModel | null>;
    updateByEmail(email: string, contact: User): Promise<number>;
    deleteByEmail(email: string): Promise<number>;
}