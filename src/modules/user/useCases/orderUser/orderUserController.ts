import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/BaseController";
import { OrderUserUseCase } from "./orderUserUseCase";
import { OrderUserUseCaseRequestDTO } from "./orderUserDTO";
import { object, string, ValidationError } from "@hapi/joi";
import { OrderUserSerializer } from "./orderUserSerializer";


export class OrderUserController extends BaseController {
    private useCase: OrderUserUseCase;

    public constructor(useCase: OrderUserUseCase) {
        super();
        this.useCase = useCase;
    }

    public async validateReq(req: Request): Promise<{ value: OrderUserUseCaseRequestDTO; error?: ValidationError }> {
        const schema = object().keys({
            offset: string().required(),
            limit: string().required()
        });

        return schema.validate(req.query, { abortEarly: false, });
    }

    public async executeImpl(req: Request, res: Response): Promise<any> {
        try {
            const { error, value: castedValue } = await this.validateReq(req);
            if (error) {
                return this.clientError(res, OrderUserSerializer.serialize([], "Validation Failed", error));
            }

            const dto: OrderUserUseCaseRequestDTO = {
                offset: castedValue.offset,
                limit: castedValue.limit,
                userID: res.locals.user.userID
            };
            const orderOrError = await this.useCase.execute(dto);
            if (orderOrError.didFailed) {
                return this.clientError(res, OrderUserSerializer.serialize([], null, orderOrError.getError()));
            }
            this.ok(res, OrderUserSerializer.serialize(orderOrError.getValue(), "Order Detaild successfully", null));
        } catch (err) {
            console.log(err);
            this.fail(res, "Internal Server Error.");
        }

    }
}