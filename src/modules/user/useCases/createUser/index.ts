import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserController } from "./createUserController";
import { UserRepoInterface } from "../../domain/repos/userRepo";


export const newCreateUserController = (useCase: CreateUserUseCase): CreateUserController => {
    return new CreateUserController(useCase);
};

export const newCreateUserUseCase = (
    userRepo: UserRepoInterface
): CreateUserUseCase => {
    return new CreateUserUseCase(userRepo);
};