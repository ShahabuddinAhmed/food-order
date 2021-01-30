import { CreateOrderController } from "./createOrderController";
import { CreateOrderUseCase } from "./createOrderUseCase";
import { OrderRepoInterface } from "../../domain/repos/orderRepo";
import { FoodRepoInterface } from "../../../admin/domain/repos/foodRepo";


export const newCreateOrderController = (useCase: CreateOrderUseCase): CreateOrderController => {
    return new CreateOrderController(useCase);
};

export const newCreateOrderUseCase = (
    orderRepo: OrderRepoInterface, foodRepo: FoodRepoInterface
): CreateOrderUseCase => {
    return new CreateOrderUseCase(orderRepo, foodRepo);
};