import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import OrderModel from "../infra/models/order";
import { Order } from "../domain/entity/order";
import { OrderStorageDTO } from "../infra/repos/orderRepo";

export class OrderMap {
    public static toDomain(raw: OrderModel): Order | null {
        const createOrderOrError = Order.create({
            actualAmount: raw.actualAmount,
            totalAmount: raw.totalAmount,
            discountType: raw.discountType,
            discount: raw.discount,
            couponCode: raw.couponCode,
            couponValue: raw.couponValue,
            deliveryCharge: raw.deliveryCharge,
            orderCode: raw.orderCode,
            paymentStatus: raw.paymentStatus,
            orderStatus: raw.orderStatus,
            restaurantAddress: raw.restaurantAddress
        }, new UniqueEntityID(raw.id));

        return createOrderOrError.didSucceed ? createOrderOrError.getValue() : null;
    }

    public static toPersistence(order: Order): OrderStorageDTO {
        return {
            actualAmount: order.actualAmount,
            totalAmount: order.totalAmount,
            discountType: order.discountType,
            discount: order.discount,
            couponCode: order.couponCode,
            couponValue: order.couponValue,
            deliveryCharge: order.deliveryCharge,
            orderCode: order.orderCode,
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus,
            restaurantAddress: order.restaurantAddress
        };
    }
}