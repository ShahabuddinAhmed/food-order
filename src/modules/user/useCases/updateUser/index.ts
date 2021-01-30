import { UpdateUserController } from "./updateUserController";
import { UpdateUserUseCase } from "./updateUserUseCase";
import { UserRepoInterface } from "../../domain/repos/userRepo";


export const newUpdateUserController = (useCase: UpdateUserUseCase): UpdateUserController => {
    return new UpdateUserController(useCase);
};

export const newUpdateUserUseCase = (
    userRepo: UserRepoInterface
): UpdateUserUseCase => {
    return new UpdateUserUseCase(userRepo);
};