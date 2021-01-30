import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/BaseController";
import { CreateOrderUseCase } from "./createOrderUseCase";
import { CreateOrderUseCaseRequestDTO } from "./createOrderDTO";
import { object, string, array, number, ValidationError } from "@hapi/joi";
import { CreateOrderUserSerializer } from "./createOrderSerializer";


export class CreateOrderController extends BaseController {
    private useCase: CreateOrderUseCase;

    public constructor(useCase: CreateOrderUseCase) {
        super();
        this.useCase = useCase;
    }

    public async validateReq(req: Request): Promise<{ value: CreateOrderUseCaseRequestDTO; error?: ValidationError }> {
        const schema = object().keys({
            couponCode: string(),
            orders: array().items(object().keys({
                producrCode: string().required(),
                quantity: number().required(),
            })).required()
        });

        return schema.validate(req.query, { abortEarly: false, });
    }

    public async executeImpl(req: Request, res: Response): Promise<any> {
        try {
            const { error, value: castedValue } = await this.validateReq(req);
            if (error) {
                return this.clientError(res, CreateOrderUserSerializer.serialize(null, "Validation Failed", error));
            }

            const dto: CreateOrderUseCaseRequestDTO = {
                couponCode: castedValue.couponCode,
                userID: res.locals.user.userID,
                orders: castedValue.orders.map(order => {
                    return {
                        producrCode: order.producrCode,
                        quantity: order.quantity
                    }
                })
            };
            const orderOrError = await this.useCase.execute(dto);
            if (orderOrError.didFailed) {
                return this.clientError(res, CreateOrderUserSerializer.serialize(null, null, orderOrError.getError()));
            }
            this.ok(res, CreateOrderUserSerializer.serialize(orderOrError.getValue(), "Order Detaild successfully", null));
        } catch (err) {
            console.log(err);
            this.fail(res, "Internal Server Error.");
        }

    }
}