import { LoginUserController } from "./loginUserController";
import { LoginUserUseCase } from "./loginUserUseCase";
import { UserRepoInterface } from "../../domain/repos/userRepo";


export const newLoginContactController = (useCase: LoginUserUseCase): LoginUserController => {
    return new LoginUserController(useCase);
};

export const newLoginContactUseCase = (
    userRepo: UserRepoInterface
): LoginUserUseCase => {
    return new LoginUserUseCase(userRepo);
};