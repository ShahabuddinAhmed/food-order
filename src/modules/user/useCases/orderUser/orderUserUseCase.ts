import { Order } from "../../domain/entity/order";
import { OrderRepoInterface } from "../../domain/repos/orderRepo";

import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { OrderUserUseCaseRequestDTO } from "./orderUserDTO";


export class OrderUserUseCase implements UseCase<OrderUserUseCaseRequestDTO, Result<Order[]>> {
    private orderRepo: OrderRepoInterface;

    constructor(orderRepo: OrderRepoInterface) {
        this.orderRepo = orderRepo;
    }

    public async execute(request: OrderUserUseCaseRequestDTO): Promise<Result<Order[]>> {
        try {
            const orderList = await this.orderRepo.getByUserID(request.userID, request.offset, request.limit);
            return Result.ok<Order[]>(orderList);
        } catch (err) {
            console.log(err);
            return Result.fail<Order[]>(err);
        }
    }
}