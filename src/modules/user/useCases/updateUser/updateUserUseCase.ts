import { User } from "../../domain/entity/user";
import { UserRepoInterface } from "../../domain/repos/userRepo";

import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { UpdateUserUseCaseRequestDTO } from "./updateUserDTO";


export class UpdateUserUseCase implements UseCase<UpdateUserUseCaseRequestDTO, Result<User>> {
    private userRepo: UserRepoInterface;

    constructor(userRepo: UserRepoInterface) {
        this.userRepo = userRepo;
    }

    public async execute(request: UpdateUserUseCaseRequestDTO): Promise<Result<User>> {
        try {
            const isUserExit = await this.userRepo.getByEmail(request.email);
            if (!isUserExit) {
                return Result.fail<User>("No user found");
            }
            
            const { email, ...toUpdate } = request;
            const updateUser = await this.userRepo.updateByEmail(email, toUpdate as User);
            if (!updateUser) {
                return Result.fail<User>("Failed to update");
            }
            return Result.ok<User>();
        } catch (err) {
            console.log(err);
            return Result.fail<User>(err);
        }
    }
}