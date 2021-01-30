import { UserRepoInterface } from "../../domain/repos/userRepo";
import { User } from "../../domain/entity/user";
import { UserMap } from "../../mappers/userMap";
import UserModel from "../models/user";


export interface UserStorageDTO {
    name: string;
    mobileNumber: string;
    email: string;
    password: string;
    address: string;
}

export class UserRepo implements UserRepoInterface {

    public async create(user: User): Promise<User | null> {
        const userRepoData = UserMap.toPersistence(user);
        const isCreateUser = await UserModel.create(userRepoData);
        if (!isCreateUser) {
            return null;
        }
        return UserMap.toDomain(isCreateUser);
    }

    public async getByEmail(email: string): Promise<UserModel | null> {
        const user = await UserModel.findOne({
            where: {
                email
            },
        });
        if (!user) {
            return null;
        }
        return user;
    }

    public async updateByEmail(email: string, toUpdate: User): Promise<number> {
        const [updatedRow] = await UserModel.update({
            ...toUpdate
        }, {
            where: {
                email
            }
        });
        return updatedRow;
    }

    public async deleteByEmail(email: string): Promise<number> {
        return await UserModel.destroy({
            where: {
                email
            }
        });
    }

    exists(t: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    save(t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }


    public createIndexes(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}