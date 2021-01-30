import { User } from "../../domain/entity/user";
import { UserRepoInterface } from "../../domain/repos/userRepo";

import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { LoginUserUseCaseRequestDTO } from "./loginUserDTO";


export class LoginUserUseCase implements UseCase<LoginUserUseCaseRequestDTO, Result<User>> {
    private userRepo: UserRepoInterface;

    constructor(userRepo: UserRepoInterface) {
        this.userRepo = userRepo;
    }

    public async execute(request: LoginUserUseCaseRequestDTO): Promise<Result<User>> {
        try {
            const { email, password } = request;
            const isUserExit: any = await this.userRepo.getByEmail(email);
            if (!isUserExit) {
                return Result.fail<User>("No user found");
            }
            const isValid = await User.verifyPassword(password, isUserExit.password);
            if (!isValid) {
                return Result.fail<User>("Invalid Credential");
            }
            const token = await User.generateAuthToken(isUserExit.id!, email);
            return Result.ok<User>({ ...isUserExit["dataValues"], token } as unknown as User);
        } catch (err) {
            console.log(err);
            return Result.fail<User>(err);
        }
    }
}