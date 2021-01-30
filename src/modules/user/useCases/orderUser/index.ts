import { OrderUserController } from "./orderUserController";
import { OrderUserUseCase } from "./orderUserUseCase";
import { OrderRepoInterface } from "../../domain/repos/orderRepo";


export const newOrderController = (useCase: OrderUserUseCase): OrderUserController => {
    return new OrderUserController(useCase);
};

export const newOrderUseCase = (
    orderRepo: OrderRepoInterface
): OrderUserUseCase => {
    return new OrderUserUseCase(orderRepo);
};