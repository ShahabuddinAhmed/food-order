import { Order } from "../../domain/entity/order";
import { OrderRepoInterface } from "../../domain/repos/orderRepo";
import { FoodRepoInterface } from "../../../admin/domain/repos/foodRepo";
import FoodModel from "../../../admin/infra/models/food";
import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { CreateOrderUseCaseRequestDTO } from "./createOrderDTO";


export class CreateOrderUseCase implements UseCase<CreateOrderUseCaseRequestDTO, Result<Order>> {
    private orderRepo: OrderRepoInterface;
    private foodRepo: FoodRepoInterface;

    constructor(orderRepo: OrderRepoInterface, foodRepo: FoodRepoInterface) {
        this.orderRepo = orderRepo;
        this.foodRepo = foodRepo;
    }

    private async formateProductCode(request: CreateOrderUseCaseRequestDTO): Promise<string[]> {
        const arrays: string[] = [];
        request.orders.forEach(order => {
            arrays.push(order.producrCode);
        });
        return arrays;
    }

    private async calculatePrice(foods: FoodModel[], request: CreateOrderUseCaseRequestDTO): Promise<number> {
        let totalPrice = 0;
        foods.forEach(food => {
            const reqOrder = request.orders.filter(order => { order.producrCode === food.productCode })[0];
            totalPrice += food.price * reqOrder.quantity;
        })
        return totalPrice;
    }

    public async execute(request: CreateOrderUseCaseRequestDTO): Promise<Result<Order>> {
        try {
            const productCodes = await this.formateProductCode(request);
            const foods = await this.foodRepo.findByProducrCode(productCodes);
            const actualAmount = await this.calculatePrice(foods, request);
            const totalAmount = actualAmount - 0 // Here is calculate discount or coupon value ;

            const order: any = await this.orderRepo.create(actualAmount, totalAmount, foods, request);
            return Result.ok<Order>(order);
        } catch (err) {
            console.log(err);
            return Result.fail<Order>(err);
        }
    }
}