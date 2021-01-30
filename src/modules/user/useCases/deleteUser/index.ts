import { DeleteUserController } from "./deleteUserController";
import { DeleteUserUseCase } from "./deleteUserUseCase";
import { UserRepoInterface } from "../../domain/repos/userRepo";


export const newDeleteUserController = (useCase: DeleteUserUseCase): DeleteUserController => {
    return new DeleteUserController(useCase);
};

export const newDeleteUserUseCase = (
    userRepo: UserRepoInterface
): DeleteUserUseCase => {
    return new DeleteUserUseCase(userRepo);
};