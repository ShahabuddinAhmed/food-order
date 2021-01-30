import { User } from "../../domain/entity/user";
import { UserRepoInterface } from "../../domain/repos/userRepo";

import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { DeleteUserUseCaseRequestDTO } from "./deleteDTO";


export class DeleteUserUseCase implements UseCase<DeleteUserUseCaseRequestDTO, Result<User>> {
    private userRepo: UserRepoInterface;

    constructor(userRepo: UserRepoInterface) {
        this.userRepo = userRepo;
    }

    public async execute(request: DeleteUserUseCaseRequestDTO): Promise<Result<User>> {
        try {

            const isUserExit = await this.userRepo.deleteByEmail(request.email);
            if (isUserExit < 1) {
                return Result.fail<User>("No email is found");
            }
            
            return Result.ok<User>();
        } catch (err) {
            console.log(err);
            return Result.fail<User>(err);
        }
    }
}