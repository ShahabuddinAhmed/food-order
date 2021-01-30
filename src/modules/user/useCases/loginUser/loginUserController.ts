import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/BaseController";
import { LoginUserUseCase } from "./loginUserUseCase";
import { LoginUserUseCaseRequestDTO } from "./loginUserDTO";
import { object, string, ValidationError } from "@hapi/joi";
import { LoginUserSerializer } from "./loginUserSerializer";


export class LoginUserController extends BaseController {
    private useCase: LoginUserUseCase;

    public constructor(useCase: LoginUserUseCase) {
        super();
        this.useCase = useCase;
    }

    public async validateReq(req: Request): Promise<{ value: LoginUserUseCaseRequestDTO; error?: ValidationError }> {
        const schema = object().keys({
            email: string().required(),
            password: string().required()
        });

        return schema.validate(req.body, { abortEarly: false, });
    }

    public async executeImpl(req: Request, res: Response): Promise<any> {
        try {
            const { error, value: castedValue } = await this.validateReq(req);
            if (error) {
                return this.clientError(res, LoginUserSerializer.serialize(null, "Validation Failed", error));
            }

            const dto: LoginUserUseCaseRequestDTO = {
                email: castedValue.email,
                password: castedValue.password
            };

            const userOrError = await this.useCase.execute(dto);
            if (userOrError.didFailed) {
                return this.clientError(res, LoginUserSerializer.serialize(null, null, userOrError.getError()));
            }

            this.ok(res, LoginUserSerializer.serialize(userOrError.getValue(), "User login successfully", null));
        } catch (err) {
            console.log(err);
            this.fail(res, "Internal Server Error.");
        }

    }
}