import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/BaseController";
import { UpdateUserUseCase } from "./updateUserUseCase";
import { UpdateUserUseCaseRequestDTO } from "./updateUserDTO";
import { object, string, ValidationError } from "@hapi/joi";
import { UpdateUserSerializer } from "./updateUserSerializer";


export class UpdateUserController extends BaseController {
    private useCase: UpdateUserUseCase;

    public constructor(useCase: UpdateUserUseCase) {
        super();
        this.useCase = useCase;
    }

    public async validateReq(req: Request): Promise<{ value: UpdateUserUseCaseRequestDTO; error?: ValidationError }> {
        const schema = object().keys({
            name: string(),
            mobileNumber: string().regex(/^(?:\+88|01)?(?:\d{11}|\d{13})$/),
            address: string()
        });

        return schema.validate(req.body, { abortEarly: false, });
    }

    public async executeImpl(req: Request, res: Response): Promise<any> {
        try {
            const { error, value: castedValue } = await this.validateReq(req);
            if (error) {
                return this.clientError(res, UpdateUserSerializer.serialize(null, "Validation Failed", error));
            }

            const dto: UpdateUserUseCaseRequestDTO = {
                name: castedValue.name,
                mobileNumber: castedValue.mobileNumber,
                email: res.locals.user.email,
                address: castedValue.address
            };

            const contactOrError = await this.useCase.execute(dto);
            if (contactOrError.didFailed) {
                return this.clientError(res, UpdateUserSerializer.serialize(null, null, contactOrError.getError()));
            }

            this.ok(res, UpdateUserSerializer.serialize(contactOrError.getValue(), "Contact Updated successfully", null));
        } catch (err) {
            console.log(err);
            this.fail(res, "Internal Server Error.");
        }

    }
}