import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/BaseController";
import { DeleteUserUseCase } from "./deleteUserUseCase";
import { DeleteUserUseCaseRequestDTO } from "./deleteDTO";
import { DeleteUserSerializer } from "./deleteUserSerializer";


export class DeleteUserController extends BaseController {
    private useCase: DeleteUserUseCase;

    public constructor(useCase: DeleteUserUseCase) {
        super();
        this.useCase = useCase;
    }

    public async executeImpl(req: Request, res: Response): Promise<any> {
        try {
            const dto: DeleteUserUseCaseRequestDTO = {
                email: res.locals.user.userID
            };
            const contactOrError = await this.useCase.execute(dto);
            if (contactOrError.didFailed) {
                return this.clientError(res, DeleteUserSerializer.serialize(null, null, contactOrError.getError()));
            }
            this.ok(res, DeleteUserSerializer.serialize(null, "Contact Deleted successfully", null));
        } catch (err) {
            console.log(err);
            this.fail(res, "Internal Server Error.");
        }
    }
}