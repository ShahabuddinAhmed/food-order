import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import UserModel from "../infra/models/user";
import { User } from "../domain/entity/user";
import { UserStorageDTO } from "../infra/repos/userRepo";

export class UserMap {
    public static toDomain(raw: UserModel): User | null {
        const createUserOrError = User.create({
            name: raw.name,
            mobileNumber: raw.mobileNumber,
            email: raw.email,
            password: raw.password,
            address: raw.address
        }, new UniqueEntityID(raw.id));

        return createUserOrError.didSucceed ? createUserOrError.getValue() : null;
    }

    public static toPersistence(user: User): UserStorageDTO {
        return {
            name: user.name,
            mobileNumber: user.mobileNumber,
            email: user.email,
            password: user.password,
            address: user.address
        };
    }
}