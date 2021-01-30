import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/BaseController";
import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserUseCaseRequestDTO } from "./createUserDTO";
import { object, string, ValidationError } from "@hapi/joi";
import { CreateUserSerializer } from "./createUserSerializer";


export class CreateUserController extends BaseController {
    private useCase: CreateUserUseCase;

    public constructor(useCase: CreateUserUseCase) {
        super();
        this.useCase = useCase;
    }

    public async validateReq(req: Request): Promise<{ value: CreateUserUseCaseRequestDTO; error?: ValidationError }> {
        const schema = object().keys({
            name: string().required(),
            mobileNumber: string().regex(/^(?:\+88|01)?(?:\d{11}|\d{13})$/).required(),
            email: string().required(),
            password: string().min(8).required(),
            address: string().required()
        });

        return schema.validate(req.body, { abortEarly: false, });
    }

    public async executeImpl(req: Request, res: Response): Promise<any> {
        try {
            const { error, value: castedValue } = await this.validateReq(req);
            if (error) {
                return this.clientError(res, CreateUserSerializer.serialize(null, "Validation Failed", error));
            }

            const dto: CreateUserUseCaseRequestDTO = {
                name: castedValue.name,
                mobileNumber: castedValue.mobileNumber,
                email: castedValue.email,
                password: castedValue.password,
                address: castedValue.address
            };

            const userOrError = await this.useCase.execute(dto);
            if (userOrError.didFailed) {
                return this.clientError(res, CreateUserSerializer.serialize(null, null, userOrError.getError()));
            }

            this.ok(res, CreateUserSerializer.serialize(userOrError.getValue(), "User Created successfully", null));
        } catch (err) {
            console.log(err);
            this.fail(res, "Internal Server Error.");
        }

    }
}