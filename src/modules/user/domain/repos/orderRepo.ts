import { Repo } from "../../../../shared/infra/Repo";
import { Order } from "../entity/order";
import FoodModel from "../../../admin/infra/models/food";
import OrderModel from "../../infra/models/order";
import { CreateOrderUseCaseRequestDTO } from "../../useCases/createOrder/createOrderDTO";

export interface OrderRepoInterface extends Repo<Order> {
    create(actualAmount: number, totalAmount: number, orders: FoodModel[], request: CreateOrderUseCaseRequestDTO): Promise<OrderModel>;
    getByUserID(userID: number, offset: number, limit: number): Promise<Order[]>;
    updateByOrderCode(orderCode: string, toUpdate: Order): Promise<number>;
}