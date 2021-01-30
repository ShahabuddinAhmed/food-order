import { OrderRepoInterface } from "../../domain/repos/orderRepo";
import { Order } from "../../domain/entity/order";
import { OrderMap } from "../../mappers/orderMap";
import OrderModel from "../models/order";
import OrderDetailModel from "../models/orderDetail";
import { Discount } from "../../domain/value/discountType";
import { OrderStatus, OrderStatusType } from "../../domain/value/orderStatus";
import { PaymentStatus, PaymentStatusType } from "../../domain/value/paymentStatus";
import FoodModel from "../../../admin/infra/models/food";
import { CreateOrderUseCaseRequestDTO } from "../../useCases/createOrder/createOrderDTO";


export interface OrderStorageDTO {
    actualAmount: number;
    totalAmount: number;
    discountType: Discount;
    discount: number;
    couponCode: string;
    couponValue: number;
    orderCode: string;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    restaurantAddress: string;
}

export class OrderRepo implements OrderRepoInterface {

    public async create(actualAmount: number, totalAmount: number, foods: FoodModel[], request: CreateOrderUseCaseRequestDTO): Promise<OrderModel> {
        const isCreateOrder = await OrderModel.create({
            actualAmount,
            totalAmount,
            restaurantAddress: foods[0].restaurantAddress,
            orderCode: "",
            orderStatus: OrderStatusType.PROCESSING,
            paymentStatus: PaymentStatusType.UNPAID,
        });
        const formateOrderDetailData = foods.map(food => {
            let quantity = 0;
            foods.forEach(food => {
                quantity = request.orders.filter(order => { order.producrCode === food.productCode })[0].quantity;
            })
            return {
                title: food.title,
                price: food.price,
                quantity,
                userID: request.userID,
                orderID: isCreateOrder.id
            }
        })
        await OrderDetailModel.create(formateOrderDetailData);
        return isCreateOrder;
    }

    public async getByUserID(userID: number, offset: number, limit: number): Promise<Order[]> {
        const order: any = await OrderModel.findAll({
            where: {
                userID
            },
            offset, limit
        });
        if (!order.length) {
            return [];
        }
        // return OrderMap.toDomain(order);
        return order;
    }

    public async updateByOrderCode(orderCode: string, toUpdate: Order): Promise<number> {
        const [updatedRow] = await OrderModel.update({
            ...toUpdate
        }, {
            where: {
                orderCode
            }
        });
        return updatedRow;
    }

    exists(t: Order): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    save(t: Order): Promise<Order> {
        throw new Error("Method not implemented.");
    }


    public createIndexes(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}